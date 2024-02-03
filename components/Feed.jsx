'use client'
import { useState, useEffect, useContext} from 'react';
import Image from 'next/image'
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

const getPlaylist = (songArr) => {
  return songArr.map(song => ({
    title: song.title,
    artist: song.artist,
    id: song._id,
    audioUrl: song.audioUrl,
    coverImage: song.coverImage
  }));
};

const Feed = () => {
  const router = useRouter();
  const [releases, setReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadKey, setLoadKey] = useState(0); // Added a key to force re-render
  const { playbackState, setPlaybackState } = useContext(PlaybackContext);

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    const fetchReleases = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/releases');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (isMounted) { // Only update state if component is mounted
          setReleases(data);
          setIsLoading(false);
          setLoadKey(prevKey => prevKey + 1); // Increment key to force re-render
          // Handle setting playback state here...
        }
      } catch (error) {
        console.error('Failed to fetch releases:', error);
        if (isMounted) setIsLoading(false);
      }
    };

    fetchReleases();

    return () => { isMounted = false; }; // Cleanup function to set isMounted to false
  }, []); // Ensure dependencies are correct

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return ( 

    <section className="w-full mt-2 pb-24"  key={loadKey}>
      <div className="w-full flex flex-col container mt-2 bg-transparent mb-2">
        <div className='flex flex-col p-3 pb-3'>
          <div className='flex flex-row mb-2 justify-between items-center'> {/* Added items-center */}
            <h1 className="text-3xl font-bold">
              Today's Releases
            </h1>
            <div className='flex flex-row'>
              <button className='flex flex-row items-center hover:text-purple-500'>
                <span className="text-md font-light mr-1">
                  Type
                </span>
                <Image
                  src="/assets/icons/chevron-down.svg"
                  alt="chevron down"
                  width={15}
                  height={15}
                  className="rounded-full"
                />
              </button>
            </div>
          </div>
          <div className="flex-grow border-t border-stone-300"/>
        </div>
        <ol className="w-full flex flex-col divide-y ">
          <ReleaseList
            data={releases}
          />
        </ol>
      </div>
    </section>
  )
}

export default Feed