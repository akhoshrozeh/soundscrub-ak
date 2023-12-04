'use client'
import { useState, createContext } from 'react';

export const PlaybackContext = createContext();

export const PlaybackProvider = ({ children }) => {

    let initPlaybackState = {

        currentSong: {
            id: null,
            title: 'No Songs Loaded',
            artist: 'N/A',
            audioUrl: 'https://soundscrub-web-storage.s3.us-east-2.amazonaws.com/wakemeup_off.wav'
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