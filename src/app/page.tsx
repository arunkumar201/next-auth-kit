'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Lock } from 'lucide-react';
import { LoginButton } from '@/components/custom-ui/login-button';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <section className='w-full py-12 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='flex flex-col items-center space-y-4 text-center'>
            <div className='w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40'>
              <Lock className='w-full h-full text-blue-500 dark:text-blue-300' />
            </div>
            <div className='space-y-2'>
              <h1 className='text-4xl mb-3 font-bold tracking-wider sm:text-4xl md:text-5xl lg:text-6xl/none'>
                Ultimate Auth
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-800 md:text-xl dark:text-gray-400'>
                A secure, scalable, and reliable authentication solution
                designed for modern applications. Protect your users data and
                provide them with a seamless login experience.
              </p>
            </div>
            <div className='space-x-12'>
              <LoginButton>
                <Button variant='secondary' className='text-base md:text-xl'>
                  Sign In
                </Button>
              </LoginButton>
              <LoginButton>
                <Button
                  variant='secondary'
                  className='text-base md:text-xl p-5 '
                >
                  Sign Up
                </Button>
              </LoginButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
