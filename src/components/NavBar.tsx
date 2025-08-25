"use client"

import { useGameContext } from "@/context/GameContext"
import { useState } from "react"
import { IoSettings } from "react-icons/io5"
import { TbMusic, TbMusicOff } from "react-icons/tb"


export const NavBar = () => {

    const { music, toggleMusic } = useGameContext()
    const [openSettings, setOpenSettings] = useState(false)

  return (
    <div className="fixed top-0 left-0 w-full h-[50px] text-white flex items-center justify-end gap-2 p-4">
        
        {music 
            ? <TbMusic onClick={toggleMusic} className="text-3xl cursor-pointer hover:scale-120" />
            : <TbMusicOff onClick={toggleMusic} className="text-3xl cursor-pointer hover:scale-120" />
        }

        <IoSettings className="text-3xl cursor-pointer hover:scale-120" />
    </div>
  );
};