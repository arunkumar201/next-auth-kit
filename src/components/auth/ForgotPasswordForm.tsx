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
import { ForgotPassword } from '@/actions/forgot-password';
import FormError from '../form-error';
import FormSuccess from '../success';
import { Input } from '@/components/ui/input';
import Overlay from '../Dialog';
import { ResetPasswordSchema } from '@/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ForgotPasswordForm = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [redirectingMsg, setRedirectingMsg] = useState<boolean>(false);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    setError('');
    setSuccess('');

    startTransition(async () => {
      try {
        const res = await ForgotPassword(values);
        setSuccess(res?.success!);
        setRedirectingMsg(true);
        if (res?.success) {
          setTimeout(() => {
            router.push('/auth/login');
            setRedirectingMsg(false);
          }, 200);
        }

        setError(res?.error!);
      } catch (error: unknown) {
        setError(error as string);
      }
    });
  };
  return (
    <>
      <div className=''>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
            <div className='space-y-5'>
              <FormField
                control={form.control}
                name='email'
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type='submit' className='w-full' disabled={isPending}>
              Send Reset Email
            </Button>
          </form>
        </Form>
      </div>
      {/* Show a redirecting message if redirecting to login */}
      {redirectingMsg && <Overlay message='Redirecting to login...' />}
    </>
  );
};

export default ForgotPasswordForm;
