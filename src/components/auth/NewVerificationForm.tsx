'use client';

import { useEffect, useState } from 'react';

import { CardWrapper } from '../custom-ui/card-wrapper';
import FormError from '../form-error';
import FormSuccess from '../success';
import Overlay from '../Dialog';
import { ScaleLoader } from 'react-spinners';
import { newVerifiedToken } from '@/actions/new-verification';
import { useRouter } from 'next/navigation';

type Props = {
  token: string;
};

const NewVerificationForm = ({ token }: Props) => {
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [redirectingMsg, setRedirectingMsg] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Function to handle form submission
    const onSubmit = async () => {
      // Do not submit the form if success or error already exists
      if (success || error) {
        return;
      }

      // Return an error if token is missing
      if (!token) {
        setError('Token is Missing');
        return;
      }

      try {
        // Call the newVerifiedToken API to verify the token
        const res = await newVerifiedToken(token);

        if (res?.success) {
          // Set the success message if verification is successful
          setSuccess(res.success);

          // Show a redirecting message and navigate to login after a delay
          setRedirectingMsg(true);
          setTimeout(() => {
            router.push('auth/login');
            setRedirectingMsg(false);
          }, 100);
        } else if (res?.error) {
          // Set the error message if verification is not successful
          setError(res.error);
        }
      } catch (error) {
        setError('Something went wrong');
        console.debug('Error occurred during form submission:', error);
      }
    };

    // Call the onSubmit function for form submission
    onSubmit();
  }, [token, error, success, router]);

  return (
    <>
      <CardWrapper
        backButtonLabel='Back to Login'
        headerLabel='Confirming Your Verification'
        backButtonHref='/auth/login'
      >
        <div className='flex justify-center w-full items-center'>
          {/* Show a loading spinner if verification is in progress */}
          {!success && !error && (
            <ScaleLoader color='#3b3bed' className='text-[#3b3bed]' />
          )}
        </div>
        <div>
          {/* Show a success message if verification is successful */}
          <FormSuccess message={success} />

          {/* Show an error message if verification is not successful */}
          {!success && <FormError message={error} />}
        </div>
      </CardWrapper>

      {/* Show a redirecting message if redirecting to login */}
      {redirectingMsg && <Overlay message='Redirecting to login...' />}
    </>
  );
};

export default NewVerificationForm;
