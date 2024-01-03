'use client';

import { CardWrapper } from '@/components/custom-ui/card-wrapper';
import LoginForm from '@/components/auth/LoginForm';

type LoginProps = {};

const LoginPage = ({}: LoginProps) => {
  return (
    <>
      <CardWrapper
        headerLabel='Welcome Back'
        backButtonLabel="Don't have an account?"
        backButtonHref='/register'
        showSocial
      >
        <LoginForm />
      </CardWrapper>
    </>
  );
};

export default LoginPage;
