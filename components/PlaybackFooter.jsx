'use client'
import {useState} from 'react'
import Image from 'next/image'

const PlaybackFooter = () => {

    const [isPlaying, setIsPlaying] = useState(false);
  return (
    <footer className='w-full flex flex-row justify-center bg-stone-900	shadow-full px-1 py-2 fixed bottom-0'>
        
        <div className="space-x-7">
            <button>
                <Image 
                    className="my-2"
                    src="/assets/images/skip-backward-white.svg"
                    alt="Play button"
                    width={20}
                    height={20}                                                         
                />
            </button>
            {!isPlaying ? (
                <button onClick={() => setIsPlaying((prev) => !prev)}>
                    <Image 
                        className="my-1"
                        src="/assets/images/play-button.svg"
                        alt="Play button"
                        width={30}
                        height={30}                                                         
                    />
                </button>
            ) : (
                <button onClick={() => setIsPlaying((prev) => !prev)}>
                    <Image 
                        className="my-1"
                        src="/assets/images/pause-button.svg"
                        alt="Play button"
                        width={30}
                        height={30}                                                         
                    />
                </button>

            )}
            

            <button>
                <Image 
                    className="my-2"
                    src="/assets/images/skip-forward-white.svg"
                    alt="Play button"
                    width={20}
                    height={20}                                                         
                />
            </button>
        </div>

    </footer>
  )
}

export default PlaybackFooter