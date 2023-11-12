'use client'
import { useState, useEffect, useContext } from 'react';
import ReleaseViewProvider from '@contexts/ReleaseViewContext';
import { ReleaseViewContext } from '@contexts/ReleaseViewContext';



const ReleaseModal = () => {

  const {currentRelease, setCurrentRelease} = useContext(ReleaseViewContext);
  console.log(currentRelease)

  return (
    
        <div className='bg-white rounded-md'>
          <h3>{currentRelease._id}</h3>
          <h1>{currentRelease.title}</h1>
          <p>{currentRelease.artist}</p>

        </div>
  );
}

export default ReleaseModal