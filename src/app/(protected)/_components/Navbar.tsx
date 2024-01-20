'use client';

import { ServerIcon, SettingsIcon, UserCogIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import ThemeToggleBtn from '@/components/ThemeToggleBtn';
import { UserButton } from '@/components/auth/user-btn';
import { useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(pathname);
  }, [pathname, router]);

  function clickHandler(path: string): void {
    router.push(path);
  }

  return (
    <div className='flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-[#0F3460]'>
      <div className='flex items-center gap-4'>
        <Button
          variant={pathname === '/server' ? 'default' : 'outline'}
          className='flex justify-normal items-center gap-1'
          onClick={() => clickHandler('/server')}
        >
          <ServerIcon className='h-6 w-4 dark:text-yellow-600 text-yellow-600 ' />
          <span>Server</span>
        </Button>
        <Button
          variant={pathname === '/client' ? 'default' : 'outline'}
          className='flex justify-normal items-center gap-1'
          onClick={() => clickHandler('/client')}
        >
          <ServerIcon className='h-6 w-4 dark:text-yellow-600 text-yellow-600 ' />
          <span className=''>Client</span>
        </Button>
        <Button
          variant={pathname === '/settings' ? 'default' : 'outline'}
          className='flex justify-normal items-center gap-1'
          onClick={() => clickHandler('/settings')}
        >
          <SettingsIcon className='h-6 w-4 dark:text-yellow-600 text-yellow-600 ' />
          <span className=' '>Settings</span>
        </Button>

        <Button
          variant={pathname === '/admin' ? 'default' : 'outline'}
          className='flex justify-normal items-center gap-1'
          onClick={() => clickHandler('/admin')}
        >
          <UserCogIcon className='h-6 w-4 dark:text-yellow-600 text-yellow-600 ' />
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
