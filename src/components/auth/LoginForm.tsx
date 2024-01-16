import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { ERROR_MESSAGE } from '@/messages/error';
import FormError from '../form-error';
import FormSuccess from '../success';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Login } from '@/actions/Login';
import { LoginSchema } from '@/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type LoginFormProps = {};

const LoginForm = ({}: LoginFormProps) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isShow2FA, setIsShow2FA] = useState<boolean>(false);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const searchParamsError = useSearchParams();

  const urlError =
    searchParamsError?.get('error') === 'OAuthAccountNotLinked'
      ? ERROR_MESSAGE.OAUTH_ACCOUNT_NOT_LINKED
      : '';

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log('🚀 ~ onSubmit ~ values:', values);

    setError('');
    setSuccess('');

    startTransition(async () => {
      try {
        const res = await Login({
          email: values.email,
          password: values.password,
        });
        if (res?.error) {
          setError(res?.error!);
          form.reset();
        }
        if (res?.success) {
          setSuccess(res?.success!);
          setTimeout(() => {
            form.reset();
            router.push('/settings');
          }, 2000);
        }
        if (res?.twoFactor) {
          setIsShow2FA(true);
        }
      } catch (error: unknown) {
        setError('Something went wrong');
      }
    });
  };
  return (
    <>
      <div className=''>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
            <div className='space-y-5'>
              {!isShow2FA ? (
                <>
                  <FormField
                    control={form.control}
                    name='email'
                    disabled={isPending}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='example@gmail.com'
                            type='email'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='password'
                    disabled={isPending}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='********'
                            type='password'
                          />
                        </FormControl>
                        <Button
                          asChild
                          variant={'link'}
                          className='text-sm text-start -ml-4 -mb-4 tracking-wider hover:text-cyan-800 dark:hover:text-green-300'
                        >
                          <Link href={'/auth/forgot-password'}>
                            Forgot Password ?
                          </Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <FormField
                  control={form.control}
                  name='code'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='123456'
                          name='code'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button type='submit' className='w-full' disabled={isPending}>
              {isShow2FA ? 'Confirm' : 'Log In'}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
