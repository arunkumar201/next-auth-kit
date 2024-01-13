import { ChevronDownCircle } from 'lucide-react';

type FormSuccessProps = {
  message?: string;
};

const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) {
    return null;
  }
  return (
    <>
      <div className='flex items-center gap-x-2 text-sm  bg-emerald-500/15 text-emerald-600  p-3 rounded-xl shadow-inner'>
        <ChevronDownCircle className='self-start w-5 h-5' />
        <p className=''>{message}</p>
      </div>
    </>
  );
};

export default FormSuccess;
