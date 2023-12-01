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


export const PlaybackContext = createContext();
export const PlaylistContext = createContext();
export const CurrentSongContext = createContext();

export const PlaybackProvider = ({ children }) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackPlaylist, setPlaybackPlaylist] = useState([]);
    const [currentSong, setCurrentSong] = useState(initRelease)
    return (
            <PlaylistContext.Provider value={{playbackPlaylist, setPlaybackPlaylist}}>
                <CurrentSongContext.Provider value={{isPlaying, setIsPlaying}}>
                    <PlaybackContext.Provider value={{currentSong, setCurrentSong}}>
                            {children}
                    </PlaybackContext.Provider> 
                </CurrentSongContext.Provider>
            </PlaylistContext.Provider>
        
    )
}