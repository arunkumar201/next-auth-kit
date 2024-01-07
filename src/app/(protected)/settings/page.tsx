import { auth, signOut } from '@/auth';

import { Button } from '@/components/ui/button';

export default async function Settings() {
  const session = await auth();
  return (
    <main>
      <div>Hello World {JSON.stringify(session)}</div>
      <form action={
       async () => {
          'use server'
          await signOut()
        }
      }>
        <Button>Sign Out</Button>
      </form>
    </main>
  );
}
