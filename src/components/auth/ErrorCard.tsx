import { Button } from '../ui/button';
import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';
import React from 'react';

interface ErrorCardProps {
  errorMessage: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ errorMessage }) => {
  return (
    <div className='flex items-center justify-center w-full'>
      <div className='bg-white p-8 rounded shadow-lg max-w-md'>
        <div className='text-yellow-500 text-5xl mb-4 w-full justify-center flex'>
          <FaExclamationTriangle />
        </div>
        <p className='text-gray-800 text-lg mb-6 tracking-widest font-semibold text-center'>
          {errorMessage}
        </p>
        <Link
          prefetch={true}
          href='/auth/register'
          className='block w-full text-center bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300'
        >
          Back to Register
        </Link>
      </div>
    </div>
  );
};

export default ErrorCard;
