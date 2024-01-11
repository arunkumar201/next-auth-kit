import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState, useTransition } from 'react';

import { Button } from '@/components/ui/button';
import FormError from '../form-error';
import FormSuccess from '../success';
import { Input } from '@/components/ui/input';
import { Register } from '@/actions/Register';
import { RegisterSchema } from '@/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type RegisterFormProps = {};

const RegisterForm = ({}: RegisterFormProps) => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.debug(
      '🚀 ~ file: RegisterForm.tsx:40 ~ onSubmit ~ values:',
      values
    );

    startTransition(async () => {
      setError('');
      setSuccess('');
      try {
        const res = await Register({
          email: values.email,
          password: values.password,
          name: values.name,
        });
        setSuccess(res?.success!);
        setError(res?.error!);
      } catch (error: unknown) {
        setError(error as string);
      }
      form.reset();
    });
  };
  return (
    <div className=''>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
          <div className='space-y-5'>
            <FormField
              control={form.control}
              name='name'
              disabled={isPending}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='John Wick' type='text' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input {...field} placeholder='********' type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type='submit' className='w-full' disabled={isPending}>
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
