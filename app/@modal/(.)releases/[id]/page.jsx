'use client'
import ReleaseModal from "@components/ReleaseModal"
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
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6"
      >
        <ReleaseModal
          release={currentRelease}
        />
      </div>
    </div>
  )
}

export default ReleaseModalView