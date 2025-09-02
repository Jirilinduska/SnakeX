import { useGameContext } from "@/context/GameContext"

export const useSounds = () => {

    const { sounds: isEnabled } = useGameContext()

    const play = (src: string, volume = 0.5) => {
      if (!isEnabled) return
      const audio = new Audio(src)
      audio.volume = volume
      audio.play()
    }
  
    return {
      playErrorMsg: () => play("/sounds/err_msg_sound.wav", 0.7),
      playEat: () => play("/sounds/eating_sound.wav", 0.3),
      playGameOver: () => play("/sounds/gameover_sound.wav", 0.3),
      playButton: () => play("/sounds/btn_click_sound.mp3", 0.3),
      playButtonHover: () => play("/sounds/btn_hover_sound.wav", 0.3)
    }
  }