"use client"

import { useGameContext } from "@/context/GameContext"

export const BgMusic = () => {

  const { music, bgMusicRef } = useGameContext()


  return (
    <div>
      {/* Background music */}
      <>
        {music && <audio ref={bgMusicRef} src="/sounds/menu_soundtrack.wav" autoPlay loop />}
      </>
    </div>
  )
}