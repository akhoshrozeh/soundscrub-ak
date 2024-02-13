'use client'
import { useState, useEffect, useContext} from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import ReleaseItem from '@components/ReleaseItem'
import { PlaybackContext } from '@contexts/PlaybackContext';
import "@styles/loading-spinner.css"
import { format } from 'date-fns'


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
  
  // Set up time
  const laTimeZone = 'America/Los_Angeles';

  let today = new Date(new Date().toLocaleString("en-US", {timeZone: laTimeZone}));
  today.setHours(0, 0, 0, 0);

  // Calculate last Monday
  let lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1));

  // Calculate next Sunday
  let nextSunday = new Date(lastMonday);
  nextSunday.setDate(lastMonday.getDate() + 6); // From last Monday to next Sunday is always +6 days

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    const fetchReleases = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/releases');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log(data)
        if (isMounted) { // Only update state if component is mounted
          setReleases(data);

          // Set up Playlist
          const playlist = getPlaylist(data);
          const playlistIdx = playbackState.currentSongIdx;

          let currSong = {
            title: playlist[playlistIdx].title,
            artist: playlist[playlistIdx].artist,
            id: playlist[playlistIdx].id,
            audioUrl: playlist[playlistIdx].audioUrl,
            coverImage: playlist[playlistIdx].coverImage
          }
          console.log(currSong)
          setPlaybackState(prevState => ({...prevState, 
            currentSong: currSong,
            playlist: playlist,
          }))

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
    return (
      <div className="mt-6 page-loader">
      </div>
    );
  }
  return ( 

    <section className="w-full mt-2 pb-24"  key={loadKey}>
      <div className="w-full flex flex-col container mt-2 bg-transparent mb-2">
        <div className='flex flex-col p-3 pb-3'>
          <div className='flex flex-row mb-2 justify-between items-center'> {/* Added items-center */}
            <div className='flex flex-row items-end'>
              <h1 className="text-3xl font-bold mr-2">
                This Week's Releases
              </h1>
              
              {/* Vertical gray line separator with Tailwind CSS */}
              <div className="w-px bg-gray-300 self-stretch"></div>
              
              <h2 className='text-md text-stone-600 ml-2 mb-1'>
                {format(lastMonday.toString(), "MMMM do")} to {format(nextSunday.toString(), "MMMM do")}
              </h2>
            </div>

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