import { auth } from '@/auth';

export default async function Settings() {
  const session = await auth();
  return (
    <main>
      <div>Hello World {JSON.stringify(session)}</div>
    </main>
  );
}
