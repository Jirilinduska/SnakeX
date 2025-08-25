"use client"

import { useState } from "react"
import { GameGrid } from "./GameGrid"
import { Menu } from "./Menu"
import { Sounds } from "./Sounds"

export const HomePage = () => {

    const [showGame, setShowGame] = useState(false)
    
    const toggleShowGame = () => setShowGame(prev => !prev)

  return (
    <>

    <Sounds /> 
    
    {showGame
        ? <GameGrid toggleShowGame={toggleShowGame} /> 
        : <Menu toggleShowGame={toggleShowGame} />
    }
    </>
  );
};