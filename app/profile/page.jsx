'use client'

import {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Profile from '@components/Profile';


const MyProfile = () => {

  const { data: session } = useSession();
  const [mySubmissions, setMyPosts] = useState([]);
  
  return (
    <Profile/>
  )
}

export default MyProfile