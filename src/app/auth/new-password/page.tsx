import { CardWrapper } from '@/components/custom-ui/card-wrapper';
import React from 'react';
import ResetPasswordForm from '@/components/auth/NewPasswordForm';

type Props = {};

const NewPassword = (props: Props) => {
  return (
    <>
      <CardWrapper
        headerLabel='Reset Your Password'
        backButtonLabel={'Back to Login?'}
        backButtonHref='/auth/login'
      >
        <ResetPasswordForm />
      </CardWrapper>
    </>
  );
};

export default NewPassword;
