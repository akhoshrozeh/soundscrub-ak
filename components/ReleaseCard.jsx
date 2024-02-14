'use client'
import { useState, useEffect, useContext } from 'react';
import {VOTE_TYPES} from '@constants/enums';
import Image from 'next/image'
import { format } from 'date-fns'
import { PlaybackContext } from '@contexts/PlaybackContext';
import { useSession } from 'next-auth/react';


const initRelease = {
  id: null,
  title: '',
  artist: '',
  link: '',
  upvotes: [],
  upvotesLength: 0,
  coverImage: '',
  description: '',
  genre: '',
  tags: [],
  releaseDate: Date.now()
}

const ReleaseCard = ({release = initRelease}) => {

  const {playbackState, setPlaybackState} = useContext(PlaybackContext);
  const formattedDate = format(release.releaseDate, "MMMM d, yyyy");
  const { data: session } = useSession();
  const [upvotes, setUpvotes] = useState(0);
  const [voted, setVoted] = useState(null);
  const releaseUpvotes = release.upvotes;
  const releaseId = release._id;
  const releaseTitle = release.title;
  const releaseArtist = release.artist;
  const releaseAudio = release.audioUrl;
  const releaseImg = release.coverImage;

  useEffect(() => {
    // console.log(typeof(releaseUpvotes))
    console.log(release)
    if(typeof(releaseUpvotes) === 'object'){
        // console.log('array type confirmed')
        setUpvotes(releaseUpvotes.length)
        setVoted(releaseUpvotes.includes(session?.user.id))
    }
  }, [])

  const handlePlaySong = () => {
    const selectedSongIndex = playbackState.playlist.findIndex(song => song.id === releaseId);
    if (selectedSongIndex >= 0) {
        setPlaybackState({...playbackState,
            currentSong: {
                id: releaseId,
                title: releaseTitle,
                artist: releaseArtist,
                audioUrl: releaseAudio,
                coverImage: releaseImg
            },
            currentSongIdx: selectedSongIndex
        });
    }
  }

  const updateVote = async (voteType) => {

    // HOTFIX (attempted) : Checking to see if user session is valid 
    if (session?.user.id) {
        if (voteType === "upvote"){
            setUpvotes((prev) => prev + 1);
            setVoted((prev) => !prev);
        }
        else if (voteType === "downvote"){
            setUpvotes((prev) => prev - 1);
            setVoted((prev) => !prev);
        }
        
        try {

            console.log("update vote button");

            const response = await fetch(`/api/releases/${release._id}/update-vote`, {
                method: 'PATCH',
                body: JSON.stringify({
                    user: session?.user.id,
                    voteType: voteType
                })
            })

            console.log("updating vote button")


        } catch (error) {
            console.log(error);
        }
    }
    
    
  }

  const truncateString = ( str, n, useWordBoundary ) => {
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n-1); // the original check
    return (useWordBoundary 
      ? subString.slice(0, subString.lastIndexOf(" ")) 
      : subString) + "...";
  };

  const notifySignInRequired = (e) => {
    alert("You must be signed in to vote!")
  }

  function formatUrl(link) {
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
        return `https://${link}`;
    }
    return link;
  }


  return (
    
    <div className='bg-white rounded-lg overflow-hidden border-2 border-black'>
      <div className='w-full p-6'>

        <div className='flex flex-col mt-4 mb-4 ml-4 mr-4'>
          
          {/* Art & Title*/}
          <div className='w-full flex flex-row p-2 justify-between'>

            {/* Cover Art */}
            <div className='flex flex-row'>
              {release.coverImage ? (
                  <Image 
                      src={release.coverImage}
                      alt="Placeholder"
                      width={300}
                      height={200}
                      className=" rounded-lg object-cover h-80 w-80"
                  /> 
              ) : (
                  <Image 
                      src="/assets/images/placeholder-logo.svg" 
                      alt="Placeholder"
                      width={80}
                      height={80}
                      className=""
                  /> 
              )}
            </div>

            {/* Title & Buttons */}
            <div className='w-5/12 flex flex-col p-2 mr-6'>
              <div className='flex flex-row justify-between'>
                
                <div className='flex flex-col items-start mr-4'>
                  <h1 className='text-2xl font-bold '>{release.title}</h1>
                  <p className='text-lg font-semibold text-gray-700 mb-2'>{release.artist}</p>
                </div>
                <button className='mb-2' onClick={handlePlaySong}>
                  <Image
                    src="/assets/icons/play-button-purple.svg"
                    alt="play-button-purple"
                    width={50}
                    height={50}
                    className='h-50 w-50'
                  />
                </button>
              </div>

              {(voted ) ? (
              <button className="voted_btn mt-3 mb-3" onClick={() => updateVote(VOTE_TYPES.DOWNVOTE)}>
                <div className="flex flex-col items-center  ml-1 mr-1">
                  <Image
                    src="/assets/icons/216604_come_icon.svg"
                    width={10}
                    height={10}
                    className="black_arrow_svg"
                    alt="black arrow"
                  />
                  <span className="mb-1">{upvotes}</span>
                </div>
              </button>
              ) : session?.user  ? (

                <button className="vote_btn mt-3 mb-3" onClick={() => updateVote(VOTE_TYPES.UPVOTE)}>
                <div className="flex flex-col items-center  ml-1 mr-1">
                  <Image
                    src="/assets/icons/216604_come_icon.svg"
                    width={10}
                    height={10}
                    className="black_arrow_svg"
                    alt="black arrow"
                  />
                  <span className="mb-1">{upvotes}</span>
                </div>
              </button>


              )
              : (

                <button className="vote_btn mt-3 mb-3" onClick={notifySignInRequired}>
                <div className="flex flex-col items-center  ml-1 mr-1">
                  <Image
                    src="/assets/icons/216604_come_icon.svg"
                    width={10}
                    height={10}
                    className="black_arrow_svg"
                    alt="black arrow"
                  />
                  <span className="mb-1">{upvotes}</span>
                </div>
              </button>

              )}
              
                {release.link && (
                  <a
                    href={formatUrl(release.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='link_btn flex justify-center items-center'
                  >
                    {"Visit Artist Website 🔗"}
                  </a>
                )}
              </div>
          </div>

          {/* Link */}

          


          {/* Description */}
            <div className='mt-4 pb-10'>
              {release.genre && <p className='text-sm text-gray-600'>Genre: {release.genre}</p>}
              {release.tags.length > 0 && <p className='text-sm text-gray-600'>Tags: {release.tags.join(', ')}</p>}
              {release.description && <p className='mt-2 text-gray-800 my-3'>{truncateString(release.description, 500, true)}</p>}
              <p className='text-sm text-gray-600'>Release Date: {formattedDate}</p>
              {/* <p className='text-sm text-gray-600'>UpvotesLength: {release.upvotesLength}</p>
              <p className='text-sm text-gray-600'>Upvotes: {release.upvotes.length}</p> */}
            </div>
          </div>  
      </div>
    </div>
  );
}

export default ReleaseCard;