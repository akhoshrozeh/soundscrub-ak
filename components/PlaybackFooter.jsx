'use client'
import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { PlaybackContext } from '@contexts/PlaybackContext';
import { ReleaseViewContext } from '@contexts/ReleaseViewContext';
import "@styles/slider.css"
import ReactHowler from 'react-howler'
import Link from 'next/link';


const PlaybackFooter = () => {
    const {playbackState, setPlaybackState} = useContext(PlaybackContext);
    const {currentRelease, setCurrentRelease} = useContext(ReleaseViewContext);


    const handlePlayButtonClick = () => {
        console.log("playing song")
        setPlaybackState({...playbackState, 
            playing: true
        })
    }

    const handlePauseButtonClick = () => {
        console.log("pausing song")
        setPlaybackState({...playbackState, 
            playing: false
        })
    }

    const handleVolumeChange = (e) => {
        console.log("changing volume")
        setPlaybackState({...playbackState,  
            volume: parseFloat(e.target.value)
        })
    }
    
    const handleBackArrow = (e) => {
        console.log("set prev song")
        if (playbackState.currentSongIdx > 0){
            let prevSongIdx = playbackState.currentSongIdx - 1;
            let prevSong = playbackState.playlist[prevSongIdx];
            setPlaybackState({
                ...playbackState, 
                currentSong: prevSong,
                currentSongIdx: prevSongIdx,
                playing: false
            })
        }
    }

    const handleForwardArrow = (e) => {
        console.log("set next song")
        if (playbackState.currentSongIdx < playbackState.playlist.length - 1){
            let nextSongIdx = playbackState.currentSongIdx + 1;
            let nextSong = playbackState.playlist[nextSongIdx];
            setPlaybackState({
                ...playbackState, 
                currentSong: nextSong,
                currentSongIdx: nextSongIdx,
                playing: false
            })
        }
    }

    const handleLink = (e) => {
        setCurrentRelease(release);
        console.log(currentRelease)
    }

    return (
        <footer className='w-full z-20 bg-stone-800 shadow-full px-4 py-4 fixed bottom-0'>
            {!playbackState.currentSong.audioUrl ? (

                <>
                </>


            ) : (

                <ReactHowler
                    src={playbackState.currentSong.audioUrl}
                    playing={playbackState.playing}
                    volume={playbackState.volume}
                />


            )}
            {/* Desktop Navigation */}
            <div className="hidden sm:flex flex-row items-center justify-between">
                {/* Left Section: Now Playing */}
                <div className="flex-1 flex justify-start">
                    <Link href={`/releases/${playbackState.currentSong.id}`} onClick={handleLink}>
                        <div className="flex px-1 py-1">

                            {playbackState.currentSong.coverImage ? (

                                <Image
                                    className=" mr-1 rounded-md object-cover h-12 w-12	"
                                    src={playbackState.currentSong.coverImage}
                                    alt="placeholder"
                                    width={35}
                                    height={35}
                                />
                            ) : (
                                <Image
                                    src="/assets/images/placeholder-logo.svg"
                                    alt="placeholder"
                                    width={35}
                                    height={35}
                                />
                            )}
                            
                            <div className='flex flex-col px-2'>
                                <span className='text-white text-md'>
                                    {playbackState.currentSong.title}
                                </span>
                                <h2 className='text-stone-400 text-sm'> {playbackState.currentSong.artist}</h2>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Center Section: Control Buttons */}
                <div className="flex-1 flex justify-center">
                    <div className="flex justify-center space-x-7">
                        <button onClick={handleBackArrow}>
                            <Image 
                                src="/assets/images/skip-backward-white.svg"
                                alt="Skip backward"
                                width={20}
                                height={20}                                                         
                            />
                        </button>
                        {!playbackState.playing ? (
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

                        <button onClick={handleForwardArrow}>
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
                        value={playbackState.volume}
                        onChange={handleVolumeChange}
                    />
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex flex-row items-center ">

                {/* Left Section: Now Playing */}
                <div className="flex-1 flex justify-start">
                    <Link href={`/releases/${playbackState.currentSong.id}`} onClick={handleLink}>
                        <div className="flex px-1 py-1">

                            {playbackState.currentSong.coverImage ? (
                                <Image
                                    className=" mr-1 rounded-md object-cover h-10 w-10	"
                                    src={playbackState.currentSong.coverImage}
                                    alt="placeholder"
                                    width={35}
                                    height={35}
                                />
                            ) : (
                                <Image
                                    src="/assets/images/placeholder-logo.svg"
                                    alt="placeholder"
                                    width={35}
                                    height={35}
                                />
                            )}
                            
                            <div className='flex flex-col px-2'>
                                <div className='items-center'>
                                    <span className=' text-white text-xs'>
                                        {playbackState.currentSong.title}
                                    </span>
                                </div>
                                <h2 className='text-stone-400 text_xxs'> {playbackState.currentSong.artist}</h2>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Center Section: Control Buttons */}
                <div className="flex-1 flex justify-center">
                    <div className="flex justify-center space-x-3">
                        <button onClick={handleBackArrow}>
                            <Image 
                                src="/assets/images/skip-backward-white.svg"
                                alt="Skip backward"
                                width={10}
                                height={10}                                                         
                            />
                        </button>
                        {!playbackState.playing ? (
                            <button onClick={handlePlayButtonClick}>
                                <Image 
                                    src="/assets/images/play-button.svg"
                                    alt="Play button"
                                    width={20}
                                    height={20}                                                         
                                />
                            </button>
                        ) : (
                            <button onClick={handlePauseButtonClick}>
                                <Image 
                                    src="/assets/images/pause-button.svg"
                                    alt="Pause button"
                                    width={20}
                                    height={20}                                                         
                                />
                            </button>
                        )}

                        <button onClick={handleForwardArrow}>
                            <Image 
                                src="/assets/images/skip-forward-white.svg"
                                alt="Skip forward"
                                width={10}
                                height={10}                                                         
                            />
                        </button>
                    </div>
                </div>

                {/* Right Section: Slider */}
                <div className="flex-1 flex justify-end">
                    <input
                        type="range"
                        className="purple-slider-sm"
                        min='0'
                        max='1'
                        step='.01'
                        value={playbackState.volume}
                        onChange={handleVolumeChange}
                    />
                </div>
            </div>

        </footer>
    );
}

export default PlaybackFooter;
