'use client'
import { useState } from 'react';
import Image from 'next/image';
import "@styles/slider.css"

const PlaybackFooter = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <footer className='w-full z-20 bg-stone-800 shadow-full px-4 py-4 fixed bottom-0'>
            <div className="flex items-center justify-between w-full">
                {/* Invisible spacer div */}
                <div className="flex-1"></div>

                {/* Centered control buttons */}
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

                {/* Slider */}
                <div className="flex-1 flex justify-end flex-shrink-0">
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
