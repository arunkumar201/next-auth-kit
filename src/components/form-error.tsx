import { BiError } from 'react-icons/bi';

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
      <div className='flex items-center gap-x-2 text-sm text-destructive bg-destructive/15 p-3 rounded-xl shadow-inner'>
        <BiError className='w-5 h-5' />
        <p>{message}</p>
      </div>
    </>
  );
};

export default FormError;
