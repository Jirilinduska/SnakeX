"use client"

import { useGameContext } from "@/context/GameContext"
import { useEffect, useRef, useState } from "react"

export const Sounds = () => {

  const { music, toggleMusic } = useGameContext()
  const bgMusicRef = useRef<HTMLAudioElement | null>(null)
  const [needsUnblock, setNeedsUnblock] = useState(false)


  // Background music
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = 0
      bgMusicRef.current.volume = 0.3
      bgMusicRef.current.play().catch(() => {
        setNeedsUnblock(true)
      })
    }
  }, [])

  const handleUnblock = () => {
    bgMusicRef.current?.play()
    setNeedsUnblock(false)
    if(!music) {
        toggleMusic()
    }
  }

  return (
    <div>

      {/* Background music */}
      <>
        {/* <audio ref={bgMusicRef} src="/sounds/menu_soundtrack.wav" autoPlay loop /> */}
        {needsUnblock && (
          <button
            onClick={handleUnblock}
            className="p-2 bg-green-600 text-white rounded fixed bottom-20 right-20 cursor-pointer"
          >
            🎧 Enable Music
          </button>
        )}
      </>
    </div>
  )
}