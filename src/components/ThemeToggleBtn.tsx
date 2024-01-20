'use client';

import { CiDark } from 'react-icons/ci';
import { HiSun } from 'react-icons/hi';
import { useState } from 'react';
import { useTheme } from 'next-themes';

const ThemeToggleBtn = () => {
  const { theme, setTheme } = useTheme();

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return theme === 'dark';
  });

  const handleToggle = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      return newDarkMode;
    });
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const btnStyle = {
    color: darkMode ? '#E2E8F0' : '#1A202C',
  };

  return (
    <button
      className='w-12 flex items-center justify-center  rounded-full transition-all duration-400'
      style={btnStyle}
      onClick={handleToggle}
    >
      <div className='w-12 absolute inset-0  rounded-full bg-gray-600 opacity-0 transition duration-500 ease-in-out' />
      <div className='w-12 absolute inset-0  rounded-full bg-gray-700 hover:dark:bg-slate-200 opacity-0 transition duration-500 ease-in-out' />
      <div className='w-12 relative z-10 '>
        {!darkMode ? (
          <HiSun size={40} className='text-yellow-300' />
        ) : (
          <CiDark size={35} className='text-gray-100' />
        )}
      </div>
    </button>
  );
};

export default ThemeToggleBtn;
