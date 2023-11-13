import React from 'react'
import Image from 'next/image'

const PlaybackFooter = () => {
  return (
    <footer className='w-2/5 flex flex-row justify-center bg-violet-500	hover:bg-violet-300 shadow-lg rounded-full px-1 py-1 mb-2 sticky bottom-2'>
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