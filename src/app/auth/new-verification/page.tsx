'use client';

import NewVerificationForm from '@/components/auth/NewVerificationForm';
import { useSearchParams } from 'next/navigation';

const NewVerificationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <>
      <NewVerificationForm token={token!} />
    </>
  );
};

export default NewVerificationPage;
