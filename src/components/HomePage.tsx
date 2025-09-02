"use client"

import { useState } from "react"
import { GameGrid } from "./GameGrid"
import { Menu } from "./Menu"
import { BgMusic } from "./BgMusic"
import { ModalUserName } from "./ModalUserName"

export const HomePage = () => {

    const [showGame, setShowGame] = useState(false)
    const toggleShowGame = () => setShowGame(prev => !prev)

  return (
    <>

    <BgMusic /> 
    <ModalUserName />
    
    {showGame
        ? <GameGrid toggleShowGame={toggleShowGame} /> 
        : <Menu toggleShowGame={toggleShowGame} />
    }
    </>
  );
};