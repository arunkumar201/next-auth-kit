'use client';

import { CardWrapper } from '@/components/custom-ui/card-wrapper';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import React from 'react';

const ForgotPassword = () => {
  return (
    <>
      <CardWrapper
        headerLabel='Reset Your Password'
        backButtonLabel={'Back to Login?'}
        backButtonHref='/auth/login'
      >
        <ForgotPasswordForm />
      </CardWrapper>
    </>
  );
};

export default ForgotPassword;
