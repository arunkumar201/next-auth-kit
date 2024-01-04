'use client';

import { CardWrapper } from '@/components/custom-ui/card-wrapper';
import RegisterForm from '@/components/auth/RegisterForm';

type RegisterProps = {};

const RegisterPage = ({}: RegisterProps) => {
  return (
    <>
      <CardWrapper
        headerLabel='Create an account'
        backButtonLabel='Already have an account?'
        backButtonHref='login'
        showSocial
      >
        <RegisterForm />
      </CardWrapper>
    </>
  );
};

export default RegisterPage;
