'use client'
import { useEffect, useState, createContext, useContext } from 'react';

const initRelease = {
    id: null,
    title: '',
    artist: '',
    link: '',
    upvotes: [],
    upvotesLength: 0,
    coverImage: '',
    description: '',
    genre: '',
    tags: [],
    releaseData: Date.now()
}

export const ReleaseViewContext = createContext();

export const ReleaseViewProvider = ({ children }) => {

    const [currentRelease, setCurrentRelease] = useState(initRelease);

    /** HELPFUL SNIPPET: Enables persistent state using storage, but results in hydration errors ?? */
    // const [currentRelease, setCurrentRelease] = useState(() => {
    //     if (typeof window !== "undefined") {
    //         const saved = localStorage.getItem('currentRelease');
    //         return saved ? JSON.parse(saved) : initRelease;
    //     }
    //     return initRelease;
    // });

    // useEffect(() => {
    //     localStorage.setItem('currentRelease', JSON.stringify(currentRelease));
    // }, [currentRelease]); 

    return (
        <ReleaseViewContext.Provider value={{currentRelease, setCurrentRelease}}>
                {children}
        </ReleaseViewContext.Provider>
    )
}