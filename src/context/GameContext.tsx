"use client"

import React, { createContext, useContext, useState } from "react"

interface GameContextProps {
    music: boolean,
    sounds: boolean
    toggleMusic: () => void
    toggleSounds: () => void
}

export const GameContext = createContext<GameContextProps | undefined>(undefined)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [music, setMusic] = useState(false)
    const [sounds, setSounds] = useState(true)

    const toggleMusic = () => setMusic(prev => !prev)
    const toggleSounds = () => setSounds(prev => !prev)

    return(
        <GameContext.Provider value={{ music, sounds, toggleMusic, toggleSounds }}>
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