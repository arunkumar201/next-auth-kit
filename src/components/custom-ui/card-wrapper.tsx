'use client';

import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

import AuthHeader from '../auth/Header';
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
    <div className='flex h-ful w-full justify-center items-start'>
      <Card className='w-[500px] shadow-lg'>
        <CardHeader>
          <AuthHeader label={headerLabel} />
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
