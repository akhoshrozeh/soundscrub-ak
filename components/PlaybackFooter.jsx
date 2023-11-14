import React from 'react'
import Image from 'next/image'

const PlaybackFooter = () => {
  return (
    <footer className='w-full flex flex-row justify-center bg-stone-900	shadow-full px-1 py-2 fixed bottom-0'>
        <button>
            <Image 
                className="my-1"
                src="/assets/images/play-button.svg"
                alt="Play button"
                width={30}
                height={30}                                                         
            />
        </button>

    </footer>
  )
}

export default PlaybackFooter