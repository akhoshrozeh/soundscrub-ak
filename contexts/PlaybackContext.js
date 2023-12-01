'use client'
import { useEffect, useState, createContext, useContext } from 'react';

export const PlaybackContext = createContext();
export const PlaylistContext = createContext();

export const PlaybackProvider = ({ children }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPlaylist, setPlaybackPlaylist] = useState([]);
    return (
            <PlaylistContext.Provider value={{playbackPlaylist, setPlaybackPlaylist}}>
                <PlaybackContext.Provider value={{isPlaying, setIsPlaying}}>
                        {children}
                </PlaybackContext.Provider>
            </PlaylistContext.Provider>
        
    )
}