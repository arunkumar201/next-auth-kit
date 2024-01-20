'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, User2Icon } from 'lucide-react';

import { Button } from '../ui/button';
import { LogoutButton } from './logout-btn';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className='h-9 w-9 rounded-full bg-emerald-300 dark:bg-amber-400 cursor-pointer'>
            <AvatarImage alt='AP' src={user?.image || ''} />
            <AvatarFallback className='bg-emerald-300'>
              <User size={20} className='text-gray-600' />
            </AvatarFallback>
            <span className='sr-only'>Toggle user menu</span>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='px-2 py-2'>
          <DropdownMenuItem className='flex justify-start items-center h-full w-full gap-2'>
            <User2Icon size={15} />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className='flex justify-start items-center h-full w-full gap-2'>
            <LogOut size={15} />
            <LogoutButton>Logout</LogoutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
