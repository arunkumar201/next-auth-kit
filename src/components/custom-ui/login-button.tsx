'use client ';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

/**
 * Renders a login button component.
 *
 * @param {ReactNode} children - The children of the component.
 * @param {boolean} asChild - Determines whether the component should render as a child.
 * @param {string} mode - The mode of the component.
 * @return {JSX.Element} The rendered login button component.
 */
const LoginButton = ({
  children,
  asChild,
  mode = 'redirect',
}: LoginButtonProps): JSX.Element => {
  const router = useRouter();

  const onClick = (): void => {
    router.push('auth/login');
    console.log('LOGIN BUTTON CLICKED');
  };
  if (mode === 'modal') {
    return (
      <>
        <span>TODO: MODAL IMPLEMENT</span>
      </>
    );
  }
  return (
    <>
      <span className='cursor-pointer' onClick={onClick}>
        {children}
      </span>
    </>
  );
};

export default LoginButton;
