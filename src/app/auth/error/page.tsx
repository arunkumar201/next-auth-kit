import ErrorCard from '@/components/auth/ErrorCard';

const ERROR_MSG = 'Oops Something Went Wrong. Please try again';
const page = () => {
  return (
    <>
      <ErrorCard errorMessage={ERROR_MSG} />
    </>
  );
};

export default page;
