'use client';

import { FaApple, FaGithub } from 'react-icons/fa';
import React, { ReactNode } from 'react';

import { BsTwitterX } from 'react-icons/bs';
import { Button } from '../ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

interface SocialButtonProps {
  icon: JSX.Element;
  provider: string;
  onClick: (provider: string) => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  provider,
  onClick,
}) => {
  return (
    <Button
      size='lg'
      className='w-full'
      variant='outline'
      onClick={() => onClick(provider)}
    >
      {icon}
    </Button>
  );
};

const handleClick = async (provider: string) => {
  await signIn(provider.toLocaleLowerCase(), {
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  });
};

/**
 * Renders a component that displays social media buttons.
 *
 * @return {ReactNode} The rendered social media buttons component.
 */
const Social: React.FC = (): ReactNode => {
  const socialButtons = [
    {
      icon: <FcGoogle className='w-7 h-7' />,
      provider: 'Google',
      onClick: handleClick,
    },
    {
      icon: <FaGithub className='w-7 h-7' />,
      provider: 'GitHub',
      onClick: handleClick,
    },
    {
      icon: <FaApple className='w-7 h-7' />,
      provider: 'Apple',
      onClick: handleClick,
    },
    {
      icon: <BsTwitterX className='w-7 h-7' />,
      provider: 'Twitter',
      onClick: handleClick,
    },
  ];

  return (
    <div className='flex items-center flex-row w-full gap-x-2 gap-y-4 flex-wrap justify-around '>
      {socialButtons.map((button, index) => (
        <div className='flex flex-col  w-[45%] ' key={index}>
          <SocialButton {...button} />
        </div>
      ))}
    </div>
  );
};

export default Social;
