import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ServerIcon, SettingsIcon, UserCogIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import ThemeToggleBtn from '@/components/ThemeToggleBtn';
import { UserButton } from '@/components/auth/user-btn';

export default function Component() {
  return (
    <div className='flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-[#0F3460]'>
      <div className='flex items-center gap-4'>
        <Button
          variant='outline'
          className='flex justify-normal items-center gap-1'
        >
          <ServerIcon className='h-6 w-4 dark:text-gray-300 text-gray-900 ' />
          <span>Server</span>
        </Button>
        <Button
          variant='outline'
          className='flex justify-normal items-center gap-1'
        >
          <ServerIcon className='h-6 w-4 dark:text-gray-300 text-gray-900 ' />
          <span className=''>Client</span>
        </Button>
        <Button
          variant='outline'
          className='flex justify-normal items-center gap-1'
        >
          <SettingsIcon className='h-6 w-4 dark:text-gray-300 text-gray-900 ' />
          <span className=' '>Settings</span>
        </Button>

        <Button
          variant='outline'
          className='flex justify-normal items-center gap-1'
        >
          <UserCogIcon className='h-6 w-4 dark:text-gray-300 text-gray-900 ' />
          <span className=''>Admin</span>
        </Button>
      </div>
      <div className='flex items-center justify-center gap-3'>
        <ThemeToggleBtn />
        <UserButton />
      </div>
    </div>
  );
}
