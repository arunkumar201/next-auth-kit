// Overlay.tsx

import React from 'react';

interface OverlayProps {
  message: string;
}

const Overlay: React.FC<OverlayProps> = ({ message }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60'>
      <div className='bg-white p-6 rounded-md shadow-md'>
        <p className='text-gray-800'>{message}</p>
      </div>
    </div>
  );
};

export default Overlay;
