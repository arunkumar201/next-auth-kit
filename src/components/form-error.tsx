import { BiError } from 'react-icons/bi';

type FormErrorProps = {
  message?: string;
};

const FormError = ({ message }: FormErrorProps) => {
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
