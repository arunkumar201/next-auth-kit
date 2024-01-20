import { FiFlag, FiMail, FiShield, FiUser } from 'react-icons/fi';

import { ExtendedUser } from '@/types/next-auth';
import { FaAddressBook } from 'react-icons/fa';
import React from 'react';

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
};

const UserInfo: React.FC<UserInfoProps> = ({ user, label }) => {
  return (
    <div className='bg-white rounded-lg shadow p-4 max-w-md mx-auto'>
      {/* Card Header */}
      <div className='text-xl font-bold mb-4'>{label}</div>

      {/* User Info */}
      {user ? (
        <div>
          <div className='flex items-center space-x-2 mb-2'>
            <FaAddressBook className='text-gray-500' />
            <span>{user.id}</span>
          </div>
          <div className='flex items-center space-x-2 mb-2'>
            <FiMail className='text-gray-500' />
            <span>{user.email}</span>
          </div>
          <div className='flex items-center space-x-2 mb-2'>
            <FiUser className='text-gray-500' />
            <span>{user.name}</span>
          </div>
          <div className='flex items-center space-x-2 mb-2'>
            <FiShield className='text-gray-500' />
            <span>{user.role}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <FiFlag className='text-gray-500' />
            <span>{user.role}</span>
          </div>
        </div>
      ) : (
        <div className='text-gray-500'>No user information available.</div>
      )}
    </div>
  );
};

export default UserInfo;
