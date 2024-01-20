import UserInfo from '@/components/UserInfo';
import { auth } from '@/auth';

const ServerPage = async () => {
  const session = await auth();
  return (
    <>
      <div>
        <UserInfo label='server Component' user={session?.user} />
      </div>
    </>
  );
};

export default ServerPage;
