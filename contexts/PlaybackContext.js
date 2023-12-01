'use client'
import { useEffect, useState, createContext, useContext } from 'react';

export const PlaybackContext = createContext();

export const PlaybackProvider = ({ children }) => {

    let initPlaybackState = {

        currentSong: {
            id: null,
            title: 'No Songs Loaded',
            artist: 'N/A'
        },
        playlist: [],
        isPlaying: false,
    }
    const [playbackState, setPlaybackState] = useState(initPlaybackState)
    return (

        <PlaybackContext.Provider value={{playbackState, setPlaybackState}}>
                {children}
        </PlaybackContext.Provider> 
        
    )
}