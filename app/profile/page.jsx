'use client'

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import { useSession } from 'next-auth/react';


import Profile from '@components/Profile';


const MyProfile = () => {

  const [mySubmissions, setMyPosts] = useState([]);
  const { data: session } = useSession();
  
  return (
    <Profile
      session={session}
    />
  )
}

export default MyProfile