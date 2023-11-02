
'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const ReleaseItem = ({ release, handleVote }) => {
    const pathName = usePathname();
    const router = useRouter();
    const [upvotes, setUpvotes] = useState(0);
    const [voted, setVoted] = useState(false);
    const { data: session } = useSession();
    const releaseUpvotes = release.upvotes;

    useEffect(() => {
        console.log(typeof(releaseUpvotes))
        if(typeof(releaseUpvotes) === 'object'){
            console.log('array type confirmed')
            setUpvotes(releaseUpvotes.length)
        }
    }, [])

    console.log(release.upvotes)
    const updateVote = async (e) => {
        console.log("update vote");

        setUpvotes((prev) => prev + 1);
        setVoted(true);
        try {

            console.log("update vote button");

            console.log(release.id)

            const response = await fetch(`/api/releases/${release._id}/update-vote`, {
                method: 'PATCH',
                body: JSON.stringify({
                    new_upvote: session?.user.id
                })
            })

            console.log("updating vote button")


        } catch (error) {
            console.log(error);
        }
        
        
    }
    
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

            {/* TODO : make the link redirect to the correct website */}
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
                
                {voted || releaseUpvotes.includes(session?.user.id) ? (
                    <button className="voted_btn mt-3 mb-3" onClick={()=>{}}> 
                        <div className="flex flex-col items-center  ml-1 mr-1">
                            <Image 
                                src="/assets/icons/216604_come_icon.svg"
                                width={10}
                                height={10}
                                className="black_arrow_svg"
                            />
                            <span className="mb-1">{upvotes}</span>
                        </div>
                </button>
                ) : (
                    <button className="vote_btn mt-3 mb-3" onClick={updateVote}> 
                        <div className="flex flex-col items-center ml-1 mr-1">
                            <Image 
                                src="/assets/icons/216604_come_icon_white.svg"
                                width={10}
                                height={10}
                                className="white_arrow_svg"
                            />
                            <span className="mb-1">{upvotes}</span>
                        </div>
                    </button>
                )}
                
            </div>
            
        </li>
    )
}

export default ReleaseItem