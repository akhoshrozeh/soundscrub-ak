'use client'
import React, { useState, useContext, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PlaybackContext } from '@contexts/PlaybackContext';
import { ReleaseViewContext } from '@contexts/ReleaseViewContext';
import "@styles/volume-slider.css"
import "@styles/seeking-slider.css"
import ReactHowler from 'react-howler'
import Link from 'next/link';
import raf from 'raf' 


const PlaybackFooter = () => {
    const {playbackState, setPlaybackState} = useContext(PlaybackContext);
    const {currentRelease, setCurrentRelease} = useContext(ReleaseViewContext);
    
    const playerRef = useRef(null);
    const rafIdRef = useRef(null);

    useEffect(() => {
        return () => clearRAF();
    }, []);

    const renderSeekPos = () => {
        if (!playbackState.seeking) {
            setPlaybackState(prevState => ({
                ...prevState,
                seek: playerRef.current.seek()
            }));
        }
        if (playbackState.playing) {
            rafIdRef.current = raf(renderSeekPos);
        }
    };

    const handleOnLoad = () => {
        setPlaybackState({...playbackState,
            loaded: true,
            duration: playerRef.current.duration()
        })
    }


    const handleOnPlay = () => {
        // setPlaybackState(prevState => ({
        //     ...prevState,
        //     playing: true
        // }));
        // renderSeekPos();
    }

    const handlePlayButtonClick = () => {
        setPlaybackState(prevState => ({
            ...prevState,
            playing: true
        }));
    }

    const handlePauseButtonClick = () => {
        playerRef.current.stop()
        setPlaybackState(prevState => ({
            ...prevState,
            playing: false
        }));
        renderSeekPos();
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

    const handleOnEnd = (e) => {
        setPlaybackState({
            ...playbackState,
            playing: false
        })
        clearRAF()
    }

    const handleSeekingChange = (e) => {
        setPlaybackState(prevState => ({
            ...prevState,
            seek: parseFloat(e.target.value)
        }));
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

    const handleMouseSeekUp = (e) => {
        setPlaybackState(prevState => ({
            ...prevState,
            seeking: false
        }));
      
        playerRef.current.seek(e.target.value)
    }

    const handleMouseSeekDown = (e) => {
        setPlaybackState(prevState => ({
            ...prevState,
            seeking: true
        }));
    }
 
    const handleLink = (e) => {
        setCurrentRelease(release);
        console.log(currentRelease)
    }

    const clearRAF = () => {
        raf.cancel(rafIdRef);
    };

    const formatSecondsToMinutes = (seconds) => {
        // Ensure the value is within the range 0 to 178
        seconds = Math.max(0, Math.min(seconds, 178));
    
        // Calculate minutes and remaining seconds
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
    
        // Format the time. Pad the seconds with a leading zero if necessary
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
                    onLoad={handleOnLoad}
                    onEnd={handleOnEnd}
                    volume={playbackState.volume}
                    ref={playerRef}
                />


            )}
            {/* Desktop Navigation */}
            <div className="hidden sm:grid grid-cols-4 gap-4 items-center justify-between">
                {/* Left Section: Now Playing */}
                <div className="col-span-1 justify-start">
                    <Link href={`/releases/${playbackState.currentSong.id}`} onClick={handleLink}>
                        <div className="flex px-1 py-1">

                            {playbackState.currentSong.coverImage ? (

                                <Image
                                    className="mr-1 rounded-md object-cover h-12 w-12"
                                    src={playbackState.currentSong.coverImage}
                                    alt="placeholder"
                                    width={35}
                                    height={35}
                                />
                            ) : (
                                <Image
                                    className=" mr-1 rounded-md object-cover h-12 w-12"
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
                <div className="col-span-2 flex flex-col justify-center">
                    <div className="flex justify-center space-x-7 mb-2">
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
                    <div className='flex flex-row text-white justify-center items-center text-center '>
                        <div className='pr-2'>
                            {formatSecondsToMinutes(playbackState.seek.toFixed(2))}
                        </div>
                        <input
                            className='w-6/12 purple-seeking-slider'
                            type='range'
                            min='0'
                            max={playbackState.duration ? playbackState.duration.toFixed(2) : 0}
                            step='.01'
                            value={playbackState.seek}
                            onChange={handleSeekingChange}
                            onMouseDown={handleMouseSeekDown}
                            onMouseUp={handleMouseSeekUp}
                        />
                        <div className='pl-2'>
                            {(playbackState.duration) ? formatSecondsToMinutes(playbackState.duration.toFixed(2)) : 'NaN'}
                        </div>
                    </div>
                </div>

                {/* Right Section: Volume Slider */}
                <div className="col-span-1 justify-end ml-4">
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
                <div className="flex flex-grow-0 flex-shrink flex-basis-1/4  justify-start">
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
                                    className=" mr-1 rounded-md object-cover h-10 w-10	"
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
                <div className="flex flex-grow flex-shrink flex-basis-1/2  flex-col justify-center ">
                    <div className="flex justify-center space-x-3 mb-2">
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
                    <div className='flex flex-row text-white justify-center items-center text-center  w-full max-w-xs '>
                        <div className='pr-2 text_xxs justify-start'>
                            {formatSecondsToMinutes(playbackState.seek.toFixed(2))}
                        </div>
                        <input
                            className='w-4/12 purple-seeking-slider justify-center items-center'
                            type='range'
                            min='0'
                            max={playbackState.duration ? playbackState.duration.toFixed(2) : 0}
                            step='.01'
                            value={playbackState.seek}
                            onChange={handleSeekingChange}
                            onMouseDown={handleMouseSeekDown}
                            onMouseUp={handleMouseSeekUp}
                        />
                        <div className='pl-2 text_xxs justify-end'>
                            {(playbackState.duration) ? formatSecondsToMinutes(playbackState.duration.toFixed(2)) : 'NaN'}
                        </div>
                    </div>
                </div>

                {/* Right Section: Volume Slider */}
                <div className="flex flex-grow-0 flex-shrink flex-basis-1/4 justify-end ml-11">
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
