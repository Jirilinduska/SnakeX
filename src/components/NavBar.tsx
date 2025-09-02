"use client"

import { useGameContext } from "@/context/GameContext"
import { TbMusic, TbMusicOff } from "react-icons/tb"
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi"
import { useSounds } from "@/hooks/useSounds"


export const NavBar = () => {

    const { music, toggleMusic, sounds, toggleSounds } = useGameContext()
    const { playButton } = useSounds()

    const classNameIcon = "text-3xl cursor-pointer hover:scale-120" 

  return (
    <div className="fixed top-0 left-0 w-full h-[50px] text-white flex items-center justify-end gap-2 p-10">
        
        {music 
            ? (
              <TbMusic 
                onClick={() => {
                  playButton()
                  toggleMusic()
                }} 
                className={classNameIcon} 
              />
            )
            : (
              <TbMusicOff 
                onClick={() => {
                  playButton()
                  toggleMusic()
                }} 
                className={classNameIcon}
              />
            )
        }

        {sounds
          ? (
            <GiSpeaker 
              onClick={() => {
                playButton()
                toggleSounds()
              }} 
              className={classNameIcon} 
            />
          )
          : (
            <GiSpeakerOff 
              onClick={() => {
                playButton()
                toggleSounds()
              }} 
              className={classNameIcon}
            />
          )
        }

    </div>
  );
};