"use client"

import React, { createContext, useContext, useEffect, useRef, useState } from "react"

interface GameContextProps {
    music: boolean,
    sounds: boolean
    toggleMusic: () => void
    toggleSounds: () => void
    bgMusicRef:  React.RefObject<HTMLAudioElement | null> 
    handleStartMusic: () => void
    incMusicVolume: () => void
    decMusicVolume: () => void
    musicVolume: number
}

export const GameContext = createContext<GameContextProps | undefined>(undefined)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [music, setMusic] = useState(true)
    const [sounds, setSounds] = useState(true)
    const [musicVolume, setMusicVolume] = useState<number>(0.3)
    const bgMusicRef = useRef<HTMLAudioElement>(null)

    const toggleMusic = () => setMusic(prev => !prev)
    const toggleSounds = () => setSounds(prev => !prev)

    const handleStartMusic = () => {
        if(bgMusicRef.current) {
            bgMusicRef.current.currentTime = 0
            bgMusicRef.current.volume = musicVolume
            bgMusicRef.current.play()
        }
    }

    const incMusicVolume = () => {
        if(musicVolume === 1) return
        setMusicVolume(prev => Math.min(1, +(prev + 0.1).toFixed(1)))
    }

    const decMusicVolume = () => {
        if(musicVolume === 0.1) return
        setMusicVolume(prev => Math.max(0, +(prev - 0.1).toFixed(1)))
    }

    useEffect(() => {
        const music = JSON.parse(localStorage.getItem("snakex_music") || "true")
        const sounds = JSON.parse(localStorage.getItem("snakex_sound") || "true")
        setMusic(music) 
        setSounds(sounds)
    }, [] )

    useEffect(() => {
        localStorage.setItem("snakex_music", JSON.stringify(music))
        localStorage.setItem("snakex_sound", JSON.stringify(sounds))
    }, [music, sounds])

    useEffect(() => {
        if(bgMusicRef.current) {
            bgMusicRef.current.volume = musicVolume 
        }
    }, [musicVolume] )

    return(
        <GameContext.Provider value={{ music, sounds, toggleMusic, toggleSounds, bgMusicRef, handleStartMusic, decMusicVolume, incMusicVolume, musicVolume  }}>
            { children }
        </GameContext.Provider>
    )
}


export const useGameContext = () => {
    const context = useContext(GameContext)
    if(!context) {
        throw new Error("useGameContext must be used within a GameProvider")
    }
    return  context
}