import React from 'react';

type AuthHeaderProps = {
  label: string;
};

/**
 * Renders the authentication header component.
 *
 * @param {AuthHeaderProps} label - The label to be displayed in the component.
 * @return {JSX.Element} The rendered authentication header component.
 */
const AuthHeader = ({ label }: AuthHeaderProps): JSX.Element => {
  return (
    <>
      <div className='w-full flex flex-col gap-y-6 items-center'>
        <h1 className='text-3xl font-bold'>🔒Ultimate Auth</h1>
        <p>{label}</p>
      </div>
    </>
  );
};

export default AuthHeader;
