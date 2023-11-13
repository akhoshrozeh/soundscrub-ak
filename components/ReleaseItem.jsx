
'use client'
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import {VOTE_TYPES} from '@constants/global';
import Link from 'next/link';
import { ReleaseViewContext } from '@contexts/ReleaseViewContext';

const ReleaseItem = ({ release }) => {
    const pathName = usePathname();
    const router = useRouter();
    const [upvotes, setUpvotes] = useState(0);
    const [voted, setVoted] = useState(null);
    const { data: session } = useSession();
    const releaseUpvotes = release.upvotes;
    const releaseId = release._id;

    const {currentRelease, setCurrentRelease} = useContext(ReleaseViewContext);
    useEffect(() => {
        console.log(typeof(releaseUpvotes))
        if(typeof(releaseUpvotes) === 'object'){
            console.log('array type confirmed')
            setUpvotes(releaseUpvotes.length)
            setVoted(releaseUpvotes.includes(session?.user.id))
        }
    }, [])

    const updateVote = async (voteType) => {

        // console.log("update vote");

        if (voteType === "upvote"){
            setUpvotes((prev) => prev + 1);
            setVoted((prev) => !prev);
        }
        else if (voteType === "downvote"){
            setUpvotes((prev) => prev - 1);
            setVoted((prev) => !prev);
        }
        
        try {

            console.log("update vote button");

            const response = await fetch(`/api/releases/${release._id}/update-vote`, {
                method: 'PATCH',
                body: JSON.stringify({
                    user: session?.user.id,
                    voteType: voteType
                })
            })

            console.log("updating vote button")


        } catch (error) {
            console.log(error);
        }
        
        
    }
    
    const notifySignInRequired = (e) => {

    }

    const handleLink = (e) => {
        setCurrentRelease(release);
        console.log(currentRelease)
    }

    return (

        <li className="flex flex-row  ">
            <Link className="flex flex-row" href={`/releases/${release._id}`} onClick={handleLink}>
                <Image 
                    src="/assets/images/placeholder-logo.svg" 
                    alt="Placeholder"
                    width={37}
                    height={37}
                    className="ml-4 mr-4"
                />
                <div className="flex-1 pl-1 mr-16 m-auto">
                    <div className="text-xl font-semibold">{release.title}</div>
                    <p className="text-gray-600">{release.artist}</p>
                </div>
            </Link>

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
                
                {(voted ) ? (
                    <button className="voted_btn mt-3 mb-3" onClick={() => updateVote(VOTE_TYPES.DOWNVOTE)}> 
                        <div className="flex flex-col items-center  ml-1 mr-1">
                            <Image 
                                src="/assets/icons/216604_come_icon.svg"
                                width={10}
                                height={10}
                                className="black_arrow_svg"
                                alt="black arrow"
                            />
                            <span className="mb-1">{upvotes}</span>
                        </div>
                </button>
                ) : session?.user ? (
                    <button className="vote_btn mt-3 mb-3" onClick={() => updateVote(VOTE_TYPES.UPVOTE)}> 
                        <div className="flex flex-col items-center ml-1 mr-1">
                            <Image 
                                src="/assets/icons/216604_come_icon_white.svg"
                                width={10}
                                height={10}
                                className="white_arrow_svg"
                                alt="white arrow"
                            />
                            <span className="mb-1">{upvotes}</span>
                        </div>
                    </button>
                ) : (
                    <button className="vote_btn mt-3 mb-3" onClick={notifySignInRequired}> 
                        <div className="flex flex-col items-center ml-1 mr-1">
                            <Image 
                                src="/assets/icons/216604_come_icon_white.svg"
                                width={10}
                                height={10}
                                className="white_arrow_svg"
                                alt="white arrow"
                            />
                            <span className="mb-1">{upvotes}</span>
                        </div>
                    </button>
                ) }
                
            </div>
            
        </li>
    )
}

export default ReleaseItem