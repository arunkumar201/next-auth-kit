import { Ban } from 'lucide-react';

type FormErrorProps = {
  message?: string;
};

/**
 * Renders a form error message component.
 *
 * @param {FormErrorProps} message - The error message to be displayed.
 * @return {JSX.Element | null} The form error message component.
 */
const FormError = ({ message }: FormErrorProps): JSX.Element | null => {
  if (!message) {
    return null;
  }
  return (
    <>
      <div className='flex items-center justify-start gap-x-2 text-sm text-destructive bg-destructive/15 dark:bg-red-300 p-3 rounded-xl shadow-inner'>
        <Ban className='self-start w-5 h-5' />
        <p className=''>{message}</p>
      </div>
    </>
  );
};

export default FormError;
