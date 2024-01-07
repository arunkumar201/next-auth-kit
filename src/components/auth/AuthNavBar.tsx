'use client';

import { BsMoonStars } from 'react-icons/bs';
import { CiDark } from 'react-icons/ci';
import { HiSun } from 'react-icons/hi';
import { useState } from 'react';
import { useTheme } from 'next-themes';

const AuthNavBar = ({ label }: { label: string }) => {
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
  return (
    <>
      <div className='flex flex-col gap-y-6 items-center justify-start'>
        <div className='flex w-full justify-between gap-x-12 items-center mt-2'>
          <h3 className='text-xl md:text-2xl font-bold '>🔒 Ultimate Auth</h3>
          <button
            className='relative p-1 text-center text-[#000000] dark:text-white dark:bg-inherit transition-all duration-100  duration-400'
            onClick={handleToggle}
          >
            <div
              className={`transition rounded-full ease-in-out duration-500 absolute inset-0 bg-gray-600  ${
                darkMode ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <div
              className={`transition ease-in-out duration-500 absolute rounded-full inset-0 bg-gray-700 dark:bg-slate-200  ${
                darkMode ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <div
              className={`relative z-10  ${
                darkMode ? 'text-yellow-300' : 'text-gray-100'
              }`}
            >
              {darkMode ? <HiSun size={40} /> : <CiDark size={30} />}
            </div>
          </button>
        </div>
        <h1 className='text-center'>{label}</h1>
      </div>
    </>
  );
};

export default AuthNavBar;
