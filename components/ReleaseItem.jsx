'use client'

'use client'
import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const ReleaseItem = ({ release, handleVote }) => {
    const pathName = usePathname();
    const router = useRouter();

    // const updateVote = async (e) => {

    //     try {
    
    //       const response = await fetch(`/api/releases/${releasesId}`)
    //     } catch (error) {
    //         console.log("updating vote count");
    //         console.log(error);
    //     }
        
    //   }
    
    return (

        <li className="flex flex-row ">
            <Image 
                src="/assets/images/placeholder-logo.svg" 
                width={37}
                height={37}
                alt={"Placeholder Img"} 
                className='ml-4 mr-4'
            />
            <div className="flex-1 pl-1 mr-16 m-auto">
                <div className="text-xl font-semibold">{release.title}</div>
                <p className="text-gray-600">{release.artist}</p>
            </div>

            <div className="flex-2 flex-col m-auto">
                <a href={release.link} target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/assets/icons/headphones.svg"
                        width={30}
                        height={30}
                        alt="Url Icon"
                    />
                </a>
            </div>
            
            <div className='px-4 m-auto'>
                
                <button className="vote_btn mt-3 mb-3" onClick={handleVote}> 

                    <div className="flex flex-col items-center">
                        <span className='font-bold'>^</span>
                        <span>{release.upvotes}</span>
                    </div>
                </button>
            </div>
            
        </li>
    )
}

export default ReleaseItem