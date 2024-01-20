'use client';

import { logout } from '@/actions/logout';

interface LogoutButtonProps {
  children: React.ReactNode;
}

/**
 * LogoutButton component that displays a button for logging out.
 *
 * @param {LogoutButtonProps} children - The children to be displayed inside the button.
 * @return {JSX.Element} A span element with a click event for logging out.
 */
export const LogoutButton = ({ children }: LogoutButtonProps): JSX.Element => {
  const logoutHandler = async () => {
    await logout();
  };
  return (
    <>
      <span onClick={logoutHandler}>{children}</span>
    </>
  );
};
