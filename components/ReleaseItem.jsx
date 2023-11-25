
'use client'
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import {VOTE_TYPES} from '@constants/enums';
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

        // HOTFIX (attempted) : Checking to see if user session is valid 
        if (session?.user.id) {
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
        
        
    }
    
    const notifySignInRequired = (e) => {

    }

    const handleLink = (e) => {
        setCurrentRelease(release);
        console.log(currentRelease)
    }

    return (

        <li className="grid grid-cols-4 justify-items-stretch col-auto py-2 px-1 ">
            <div className="flex flex-row">
                <Link href={`/releases/${release._id}`} onClick={handleLink}>
                
                    {release.coverImage ? (
                        <Image 
                            src={release.coverImage}
                            alt="Placeholder"
                            width={50}
                            height={50}
                            className="ml-4 mr-4 rounded-lg object-cover h-20 w-20	"
                        /> 
                    ) : (
                        <Image 
                            src="/assets/images/placeholder-logo.svg" 
                            alt="Placeholder"
                            width={80}
                            height={80}
                            className="ml-4 mr-4"
                        /> 
                    )}
                </Link>
            </div>

            <div className="flex flex-col justify-center">
                <Link href={`/releases/${release._id}`} onClick={handleLink} className="flex flex-col">
                    <span className="text-xl font-semibold">{release.title}</span>
                    <span className="text-sm text-gray-600">{release.artist}</span>
                </Link>
            </div>
                
            

            {/* TODO : make the link redirect to the correct website */}
            <div className="flex flex-row m-auto">
                <a href={release.link} target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/assets/icons/headphones.svg"
                        width={30}
                        height={30}
                        alt="Url Icon"
                    />
                </a>
            </div>
            
            <div className='flex flex-row m-auto mr-8'>
                
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