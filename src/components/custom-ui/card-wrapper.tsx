'use client';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

import AuthNavBar from '../auth/AuthNavBar';
import BackButton from '../auth/BackButton';
import { ReactNode } from 'react';
import Social from '../auth/Social';

interface CardWrapperProps {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  backButtonLabel,
  children,
  headerLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className=' flex h-ful w-full justify-center items-start'>
      <Card className='w-[500px] shadow-lg p-3 md:w-[30rem] dark:bg-[#1F202A]    rounded-none md:rounded-3xl bg-slate-300 mt-0 mb-2 md:mb-3 md:mt-10 shadow-neutral-300/100'>
        <CardHeader>
          <AuthNavBar label={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonHref!} />
        </CardFooter>
      </Card>
    </div>
  );
};
