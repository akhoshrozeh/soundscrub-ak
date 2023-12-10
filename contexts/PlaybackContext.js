'use client'
import { useState, createContext } from 'react';

export const PlaybackContext = createContext();

export const PlaybackProvider = ({ children }) => {

    let initPlaybackState = {

        currentSong: {
            id: null,
            title: 'No Songs Loaded',
            artist: 'N/A',
            audioUrl: ''
        },
        playlist: [],
        currentSongIdx: 0,
        playing: false,
        volume: 1
    }
    const [playbackState, setPlaybackState] = useState(initPlaybackState)
    return (

        <PlaybackContext.Provider value={{playbackState, setPlaybackState}}>
                {children}
        </PlaybackContext.Provider> 
        
    )
}