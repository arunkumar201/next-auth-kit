'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useSession } from 'next-auth/react';

export default function Settings() {
  const user = useCurrentUser();

  const handleSignOut = async () => {
    await logout();
  };
  return (
    <main>
      <div>Hello World {JSON.stringify(user)}</div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </main>
  );
}
