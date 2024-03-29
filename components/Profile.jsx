'use client'
import Image from 'next/image'
import { PROFILE_REQ } from '@constants/enums';
import { useState, useEffect } from 'react';
import Link from 'next/link'

import ReleaseItem from '@components/ReleaseItem'

const ReleaseList = ({data}) => {
  return (
    <div className="w-full flex flex-col container mt-10 mx-auto items-center justify-center bg-transparent pb-14">
      <ol className="flex flex-col divide-y w-full">
        {data.map((release) => (
          <ReleaseItem
            key={release._id}
            release={release}
          />
        ))} 
      </ol>
    </div>
  )
}



const Profile = ({session}) => {


  const [releases, setReleases] = useState([]);
  const [filter, setFilter] = useState(PROFILE_REQ.UPVOTES)

  useEffect(() => {

      const fetchReleases = async () => {

        const response = await fetch(`/api/profile/${session?.user.id}/${filter}`);
        
        try {
          const data = await response.json();

          console.log('Data successfully retrieved')
          setReleases(data);
        } catch(error){
          console.log('error getting json', error)
        }
        
      }

      fetchReleases();
  }, [filter]);

  const changeFilterMode = (filterMode) => {

    setFilter(filterMode);
    
  }


  return (
    <section className="w-full flex flex-col">

          <div className="flex flex-row mt-8 mb-5 justify-between">

            <div className="flex flex-row">
                { session?.user.image ? (
                  <Image
                  src={session?.user.image}
                  width={85}
                  height={85}
                  className="rounded-full"
                  alt="profile"
                />
                ) : (
                  <Image
                  src={'/assets/images/placeholder-logo.svg'}
                  width={85}
                  height={85}
                  className="rounded-full"
                  alt="profile"
                />
                )}
                
              
                <div className="ml-5 pt-3">
                    <text className='text-xl font-bold text-center'> {session?.user.name} </text>
                    {/* <h3 className='text-stone-500'> Here's goes the headline!</h3> */}
                </div>
              </div>

              {/* <div className="flex items-center">
                <Link href="/profile/edit-profile">
                  <button className='edit_profile_btn'>
                    Edit My Profile
                  </button>
                </Link>
              </div> */}
                

                
          </div> 

            {/* Premium Button */}
            {/* <div className="flex flex-row mx-auto mb-5">
              <Link href="/profile/get-premium">
                <button className="cta_btn space-x-1">
                  <Image
                      src="/assets/icons/icons8-sparkling-48-left.png"
                      width={15}
                      height={15}
                  />
                  <span>
                    Get Premium Features
                  </span>
                  <Image
                    src="/assets/icons/icons8-sparkling-48-right.png"
                    width={15}
                    height={15}
                  />
                </button>
              </Link>
            </div> */}
                
            <div className="hidden sm:flex flex-row space-x-1 justify-center mt-3">

              { filter !== 'upvotes' ? 
                <button className='profile_btn_unclicked' onClick={() => changeFilterMode(PROFILE_REQ.UPVOTES)}>Upvotes</button> : 
                <button className='profile_btn_clicked' onClick={() => {}}>Upvotes</button>
              }

              { filter !== 'pending' ? 
                <button className='profile_btn_unclicked' onClick={() => changeFilterMode(PROFILE_REQ.PENDING)}>Pending Submissions</button> : 
                <button className='profile_btn_clicked' onClick={() => {}}>Pending Submissions</button>
              }

              { filter !== 'accepted' ? 
                <button className='profile_btn_unclicked' onClick={() => changeFilterMode(PROFILE_REQ.ACCEPTED)}>Accepted Submissions</button> : 
                <button className='profile_btn_clicked' onClick={() => {}}>Accepted Submissions</button>
              }

            </div>

            <div className="sm:hidden flex flex-row space-x-1 justify-center mt-3">

              { filter !== 'upvotes' ? 
                <button className='profile_btn_unclicked_mobile' onClick={() => changeFilterMode(PROFILE_REQ.UPVOTES)}>Upvotes</button> : 
                <button className='profile_btn_clicked_mobile' onClick={() => {}}>Upvotes</button>
              }

              { filter !== 'pending' ? 
                <button className='profile_btn_unclicked_mobile' onClick={() => changeFilterMode(PROFILE_REQ.PENDING)}>Pending Submissions</button> : 
                <button className='profile_btn_clicked_mobile' onClick={() => {}}>Pending Submissions</button>
              }

              { filter !== 'accepted' ? 
                <button className='profile_btn_unclicked_mobile' onClick={() => changeFilterMode(PROFILE_REQ.ACCEPTED)}>Accepted Submissions</button> : 
                <button className='profile_btn_clicked_mobile' onClick={() => {}}>Accepted Submissions</button>
              }

            </div>
            <ReleaseList
              data={releases}
            />
    </section>
  )
}

export default Profile