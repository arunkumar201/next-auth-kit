'use client';

import { BsTwitterX } from 'react-icons/bs';
import { Button } from '../ui/button';
import { FaApple } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
type SocialProps = {};

const Social = ({}: SocialProps) => {
  return (
    <>
      <div className='flex items-center flex-row w-full gap-4 flex-wrap'>
        <div className='flex flex-row gap-x-3 w-full'>
          <Button
            size='lg'
            className='w-full'
            variant={'outline'}
            onClick={() => null}
          >
            <FcGoogle className='w-7 h-7' />
          </Button>
          <Button
            size='lg'
            className='w-full'
            variant={'outline'}
            onClick={() => null}
          >
            <FaGithub className='w-7 h-7' />
          </Button>
        </div>
        <div className='flex flex-row gap-x-3 w-full'>
          <Button
            size='lg'
            className='w-full'
            variant={'outline'}
            onClick={() => null}
          >
            <FaApple className='w-7 h-7' />
          </Button>

          <Button
            size='lg'
            className='w-full'
            variant={'outline'}
            onClick={() => null}
          >
            <BsTwitterX className='w-7 h-7' />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Social;
