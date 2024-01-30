'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
  const { data: session } = useSession();
  const Router = useRouter();

  useEffect(() => {
    if (!session?.user) {
      Router.push('/');
    }
  }, [session, Router]);
  
  return (
    <div>
      {session?.user ? (
                
          <Profile
            session={session}
          />
      ) :
      (
        <>
        </>
      )}
    </div>
  )
}

export default MyProfile