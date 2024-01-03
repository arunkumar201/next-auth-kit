'use client';

import { Button } from '../ui/button';
import Link from 'next/link';

type BackButtonProps = {
  label: string;
  href: string;
};

/**
 * Renders a back button with a label and href.
 *
 * @param {string} label - The text to display on the button.
 * @param {string} href - The URL to navigate to when the button is clicked.
 * @return {React.ReactNode} The rendered back button component.
 */
const BackButton = ({ label, href }: BackButtonProps): React.ReactNode => {
  return (
    <>
      <div>
        <Button
          variant={'link'}
          className='font-normal w-full'
          size={'sm'}
          asChild
        >
          <Link
            className='text-end hover:text-gray-700 focus:text-gray-900'
            href={href}
          >
            {label}
          </Link>
        </Button>
      </div>
    </>
  );
};

export default BackButton;
