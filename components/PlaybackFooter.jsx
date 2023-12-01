'use client'
import { useState } from 'react';
import Image from 'next/image';
import "@styles/slider.css"

const PlaybackFooter = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <footer className='w-full z-20 bg-stone-800 shadow-full px-4 py-4 fixed bottom-0'>
            <div className="flex flex-row items-center justify-between">
                {/* Left Section: Now Playing */}
                <div className="flex-1 flex justify-start">
                    <div className="flex bg-white rounded-xl px-1 py-1">
                        <Image
                            src="/assets/images/placeholder-logo.svg"
                            alt="placeholder"
                            width={35}
                            height={35}
                        />
                        <div className='flex flex-col px-2'>
                            <span className='text-black text-md'>
                                Powers That B
                            </span>
                            <h2 className='text-stone-500 text-sm'> Death Grips</h2>
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

                        {!isPlaying ? (
                            <button onClick={() => setIsPlaying(!isPlaying)}>
                                <Image 
                                    src="/assets/images/play-button.svg"
                                    alt="Play button"
                                    width={30}
                                    height={30}                                                         
                                />
                            </button>
                        ) : (
                            <button onClick={() => setIsPlaying(!isPlaying)}>
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
                        id="customRange1" />
                </div>
            </div>
        </footer>
    );
}

export default PlaybackFooter;
