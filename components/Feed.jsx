'use client'
import { useState, useEffect, useContext} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ReleaseItem from '@components/ReleaseItem'
import { PlaybackContext } from '@contexts/PlaybackContext';


const ReleaseList = ({data}) => {
  

  return (
      <>
      {data.map((release) => (
        <ReleaseItem
          key={release._id}
          release={release}
        />
      ))} 
      </>
  )
}

const Feed = () => {

  const router = useRouter();
  const [releases, setReleases] = useState([]);
  const {playbackState, setPlaybackState} = useContext(PlaybackContext);

  useEffect(() => {

      const fetchReleases = async () => {
        const response = await fetch('/api/releases');

        try {
          const data = await response.json();

          console.log('Data successfully retrieved')
          setReleases(data);

          let mySong = {
            title: data[0].title,
            artist: data[0].artist,
            id: data[0].id
          }
          // console.log(mySong)
          if (!playbackState.isPlaying){
            setPlaybackState({...playbackState, 
              currentSong: mySong
            })
          }

        } catch(error){
          console.log('error getting json', error)
        }
        
      }

      fetchReleases();


      
  }, []);

  return ( 

    <section className="pb-12">

      {/* <div className="relative flex py-5 items-center w-full">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 blue_gradient">Today's Releases</span>
          <div className="flex-grow border-t border-gray-400"></div>
      </div> */}

      <div className='ml-1 mb-6'>
        <h1 className=" text-3xl font-bold">
          Today's Releases
        </h1>
      </div>

      <div className="feed flex flex-col container mt-2 bg-transparent  w-full mb-2">
        <ol className="flex flex-col divide-y w-full">
          <ReleaseList
            data={releases}
          />
        </ol>
      </div>
    </section>
  )
}

export default Feed