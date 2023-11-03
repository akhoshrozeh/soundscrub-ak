'use client'
import Image from 'next/image'
import * as PROFILE_REQ from '@constants/global';
import { useState } from 'react'



const Profile = ({session}) => {


  return (
    <section className="w-full">
        <h1 className="head_text text_full"> <span className="blue_gradient">
            
            My Profile</span>
          </h1>
            {/* <p className='desc text-left'></p> */}

            {/* <div className="flex-grow border-t border-gray-400"></div> */}

            <div className="flex flex-grow flex-col mx-auto mt-6 mb-5 justify-center items-center">

                <Image
                  src={session?.user.image}
                  width={70}
                  height={70}
                  className="rounded-full"
                  alt="profile"
                />

                <span className='text-center'>
                  <h3 className='font-bold'> {session?.user.name} </h3>
                  <h6 className='italic'> Without music, life would be a mistake.</h6>
                </span>

                
            </div> 
            <div className="flex-grow border-t border-gray-400 mb-2"></div> 
            <div className="flex flex-row space-x-1 justify-center">

              <button className='profile_btn' onClick={() => {}}>Upvotes</button>
              <button className='profile_btn' onClick={() => {}}>Pending Submissions</button>
              <button className='profile_btn' onClick={() => {}}>Accepted Submissions</button>

            </div>
            <div className="flex-grow border-t border-gray-400 mt-2"></div> 

            <div className="">
            </div>
    </section>
  )
}

export default Profile