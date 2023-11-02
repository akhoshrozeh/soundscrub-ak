'use client'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReleaseItem from '@components/ReleaseItem'

const ReleaseList = ({data, handleVote}) => {
  return (
    <div className="w-full flex flex-col container mt-10 mx-auto items-center justify-center bg-transparent ">
      <ol className="flex flex-col divide-y w-full">
        {data.map((release) => (
          <ReleaseItem
            key={release._id}
            release={release}
            handleVote={handleVote}
          />
        ))} 
      </ol>
    </div>
  )
}

const Feed = () => {

  const router = useRouter();
  const [releases, setReleases] = useState([]);

  useEffect(() => {

      const fetchReleases = async () => {
        const response = await fetch('/api/releases');

        try {
          const data = await response.json();

          console.log('Data successfully retrieved')
          setReleases(data);
        } catch(error){
          console.log('error getting json', error)
        }
        
      }

      fetchReleases();
  }, []);

  return ( 

    <section className="feed">
      <h2>
        
      </h2>

      <div className="relative flex py-5 items-center w-full">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 blue_gradient">Today's Releases</span>
          <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <ReleaseList
        data={releases}
        handleVote = {() => {}}
      />
    </section>
  )
}

export default Feed