'use client'
import { useState, createContext } from 'react';

export const PlaybackContext = createContext();

export const PlaybackProvider = ({ children }) => {

    let initPlaybackState = {

        currentSong: {
            id: null,
            title: 'No Songs Loaded',
            artist: 'N/A',
            audioUrl: '',
            coverImage: ''
        },
        playlist: [],
        currentSongIdx: 0,
        loaded: false,
        playing: false,
        seeking: false,
        volume: 1,
        seek: 0.0,
        duration: 0.0
    }
    const [playbackState, setPlaybackState] = useState(initPlaybackState)
    return (

        <PlaybackContext.Provider value={{playbackState, setPlaybackState}}>
                {children}
        </PlaybackContext.Provider> 
        
    )
}