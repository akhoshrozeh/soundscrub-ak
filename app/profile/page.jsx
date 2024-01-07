'use client'
import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';
export const dynamic = 'force-dynamic'


const MyProfile = () => {
  const { data: session } = useSession();
  
  return (
    <Profile
      session={session}
    />
  )
}

export default MyProfile