'use client'
import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { PlaybackContext } from '@contexts/PlaybackContext';
import "@styles/slider.css"
import ReactHowler from 'react-howler'


const PlaybackFooter = () => {
    const {playbackState, setPlaybackState} = useContext(PlaybackContext);
    
    let initState = {
        playing: false,
        volume: 1
    }

    const [playerState, setPlayerState] = useState(initState);

    console.log(playbackState)


    const handlePlayButtonClick = () => {
        console.log("playing song")
        setPlayerState({...playerState, 
            playing: true
        })
        setPlaybackState({...playbackState, 
            isPlaying: true
        })
        console.log(playerState, playbackState)
    }

    const handlePauseButtonClick = () => {
        console.log("pausing song")
        setPlayerState({...playerState, 
            playing: false
        })
        setPlaybackState({...playbackState, 
            isPlaying: true
        })
        console.log(playerState, playbackState)

    }

    const handleVolumeChange = (e) => {
        setPlayerState({...playerState,  
            volume: parseFloat(e.target.value)
        })
    }

    return (
        <footer className='w-full z-20 bg-stone-800 shadow-full px-4 py-4 fixed bottom-0'>
            <ReactHowler
                src={playbackState.currentSong.audioUrl}
                playing={playerState.playing}
                volume={playerState.volume}
            />
            <div className="flex flex-row items-center justify-between">
                {/* Left Section: Now Playing */}
                <div className="flex-1 flex justify-start">
                    <div className="flex bg-stone-100 rounded-xl px-1 py-1">
                        <Image
                            src="/assets/images/placeholder-logo.svg"
                            alt="placeholder"
                            width={35}
                            height={35}
                        />
                        <div className='flex flex-col px-2'>
                            <span className='text-black text-md'>
                                {playbackState.currentSong.title}
                            </span>
                            <h2 className='text-stone-500 text-sm'> {playbackState.currentSong.artist}</h2>
                        </div>
                    </div>
                </div>

                {/* Center Section: Control Buttons */}
                <div className="flex-1 flex justify-center">
                    <div className="flex justify-center space-x-7">
                        <button>
                            <Image 
                                src="/assets/images/skip-backward-white.svg"
                                alt="Skip backward"
                                width={20}
                                height={20}                                                         
                            />
                        </button>
                        {!playerState.playing ? (
                            <button onClick={handlePlayButtonClick}>
                                <Image 
                                    src="/assets/images/play-button.svg"
                                    alt="Play button"
                                    width={30}
                                    height={30}                                                         
                                />
                            </button>
                        ) : (
                            <button onClick={handlePauseButtonClick}>
                                <Image 
                                    src="/assets/images/pause-button.svg"
                                    alt="Pause button"
                                    width={30}
                                    height={30}                                                         
                                />
                            </button>
                        )}

                        <button>
                            <Image 
                                src="/assets/images/skip-forward-white.svg"
                                alt="Skip forward"
                                width={20}
                                height={20}                                                         
                            />
                        </button>
                    </div>
                </div>

                {/* Right Section: Slider */}
                <div className="flex-1 flex justify-end">
                    <input
                        type="range"
                        className="purple-slider"
                        min='0'
                        max='1'
                        step='.01'
                        value={playerState.volume}
                        onChange={handleVolumeChange}
                    />
                </div>
            </div>
        </footer>
    );
}

export default PlaybackFooter;
