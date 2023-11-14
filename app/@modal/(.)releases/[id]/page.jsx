'use client'
import ReleaseCard from "@components/ReleaseCard"
import React, { useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ReleaseViewContext } from '@contexts/ReleaseViewContext';


const ReleaseModalView = ({ params }) => {

  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();
  const {currentRelease, setCurrentRelease} = useContext(ReleaseViewContext);
  console.log(currentRelease)

  const onDismiss = () => {
    router.back();
  };

  const onClick = (e) => {
    if (e.target === overlay.current || e.target === wrapper.current) {
      onDismiss();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      onDismiss();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      onClick={onClick}
    >
      <div className="absolute inset-x-0 top-10 m-10 text-2xl">
        <button 
            onClick={onDismiss} 
            className="font-bold bg-stone-600 rounded-full text-white"
            aria-label="Close"
          >
            <span className="px-3">&times;</span>
          </button>
        </div>
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6"
      >
        
        

        <ReleaseCard
          release={currentRelease}
        />
      </div>
    </div>
  )
}

export default ReleaseModalView