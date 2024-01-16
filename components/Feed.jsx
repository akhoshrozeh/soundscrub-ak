'use client'
import { useState, useEffect, useContext} from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import ReleaseItem from '@components/ReleaseItem'
import { PlaybackContext } from '@contexts/PlaybackContext';
import useSWR from 'swr';


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

const fetcher = url => fetch(url, { cache: 'no-store' }).then(res => res.json());

const Feed = () => {

  const [releases, setReleases] = useState([]);
  const {playbackState, setPlaybackState} = useContext(PlaybackContext);

  const { data, error } = useSWR('/api/releases', fetcher, {
    onSuccess: (data) => {
      console.log('Data successfully retrieved');
      setReleases(data);  // Update the releases state

      const playlist = getPlaylist(data);
      const playlistIdx = playbackState.currentSongIdx;
      let currSong = playlist[playlistIdx] || {};

      if (!playbackState.isPlaying) {
        setPlaybackState({
          ...playbackState, 
          currentSong: currSong,
          playlist: playlist,
        });
      }
    },
    onError: (error) => {
      console.log('Error fetching releases:', error);
    }
  });

  return ( 

    <section className="w-full mt-2 pb-24">
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