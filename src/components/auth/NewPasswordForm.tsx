'use client';

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
import { NewPasswordSchema } from '@/schema';
import Overlay from '../Dialog';
import { ResetPassword } from '@/actions/resetPassword';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ResetPasswordForm = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [redirectingMsg, setRedirectingMsg] = useState<boolean>(false);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const searchParams = useSearchParams();

  const token = searchParams.get('token')!;

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError('');
    setSuccess('');

    if (values.confirmPassword !== values.password) {
      setError("Passwords don't match");
    }

    startTransition(async () => {
      try {
        const res = await ResetPassword(values.password, token);
        setSuccess(res?.success!);
        setRedirectingMsg(true);
        if (res?.success) {
          setTimeout(() => {
            router.push('/auth/login');
            setRedirectingMsg(false);
          }, 200);
        }
        if (res?.error) {
          setError(res?.error!);
        }
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

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                disabled={isPending}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-Enter Your Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='********'
                        type='password'
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
              Reset Password
            </Button>
          </form>
        </Form>
        {/* Show a redirecting message if redirecting to login */}
        {redirectingMsg && <Overlay message='Redirecting to login...' />}
      </div>
    </>
  );
};

export default ResetPasswordForm;
