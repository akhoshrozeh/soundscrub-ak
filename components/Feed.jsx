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
  const {playbackState, setPlaybackState} = useContext(PlaybackContext);

  useEffect(() => {

      const fetchReleases = async () => {
        const response = await fetch('/api/releases');

        try {
          const data = await response.json();

          console.log('Data successfully retrieved')
          setReleases(data);

          const playlist = getPlaylist(data);

          const playlistIdx = playbackState.currentSongIdx;

          let currSong = {
            title: playlist[playlistIdx].title,
            artist: playlist[playlistIdx].artist,
            id: playlist[playlistIdx]._id,
            audioUrl: playlist[playlistIdx].audioUrl,
            coverImage: playlist[playlistIdx].coverImage
          }
          console.log(currSong)
          if (!playbackState.isPlaying){
            setPlaybackState({...playbackState, 
              currentSong: currSong,
              playlist: playlist,
            })
          }

        } catch(error){
          console.log('error getting json', error)
        }
        
      }

      fetchReleases();


      
  }, []);

  return ( 

    <section className="w-full pb-12">

      {/* <div className="relative flex py-5 items-center w-full">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 blue_gradient">Today's Releases</span>
          <div className="flex-grow border-t border-gray-400"></div>
      </div> */}

      

      <div className="w-full feed flex flex-col container mt-2 bg-transparent mb-2">
        <div className='flex mb-2'>
          <h1 className=" text-3xl font-bold">
            Today's Releases
          </h1>
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