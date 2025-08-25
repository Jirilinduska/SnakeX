"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ModalSettings } from "./ModalSettings"

type Props = {
    toggleShowGame: () => void
}

const SnakePart = () => {
    return <div className="w-[10px] h-[10px] bg-green-500 border border-gray-900"></div>
}

const SnakeHead = () => {
    return (
        <div className="w-[10px] h-[10px] bg-green-500 border border-gray-900">
            <div className="w-[2px] h-[2px] bg-black"></div>
            <div className="w-[2px] h-[2px] bg-black"></div>
            <div className="w-[2px] h-[10px] bg-red-500"></div>
        </div>
    )
}

export const SnakeLogo = ({ toggleShowGame } : Props) => {

    const btnHoverSound = useRef<HTMLAudioElement | null>(null)

    // const [snake, setSnake] = useState<number[]>(Array.from({ length: 32 }, (_, i) => i))
    const [snake, setSnake] = useState<number[]>(Array.from({ length: 5 }, (_, i) => i))
    const [food, setFood] = useState<number[]>([10,13,15])
    const [settingsModal, setSettingsModal] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const handlePlayBtnHoverSound = () => {
        if(btnHoverSound.current) {
            btnHoverSound.current.currentTime = 0
            btnHoverSound.current.volume = 0.3
            btnHoverSound.current.play()
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
          setSnake((prevSnake) => {
            const head = prevSnake[prevSnake.length - 1]
            let newHead = head
            let newSnake = [...prevSnake]

            if(food.includes(newHead)) {
                newSnake = [...prevSnake, newHead]
            } 

            if(newHead > 210) {
                newHead = 0
            } else {
                newHead = head + 1 
            }

            newSnake = [...prevSnake.slice(1), newHead]
    
            return newSnake
          });
        }, 200);
    
        return () => clearInterval(interval);
      }, [])

  return (
    <div>

        <ModalSettings handleClose={() => setSettingsModal(false)} open={settingsModal}/>

        <audio ref={btnHoverSound} src="/sounds/btn_hover_sound.wav" />

        <div className="flex">

            <div className="flex flex-col-reverse">
                {Array.from({ length: 34 }).map((_, i) => {
                    const idx = 178 + i; // otočení pořadí indexů
                    return <div key={idx} className={`${snake.includes(idx) ? "bg-green-500 border border-gray-900" : food.includes(i) ? "bg-red-500 border-gray-900" : ""} w-[10px] h-[10px]`}  />
                    // return <div key={idx} className={`${snake.includes(idx) ? "bg-green-500 border border-gray-900" : ""} w-[10px] h-[10px]`}  />
                })}
            </div>


            <div className="">

                {/* HORNÍ HRANA (i 0-34)*/}
                <div className="">
                    <div className="flex">
                        {Array.from({ length: 37 }).map((_, i) => (
                            // <div key={i} className={`${snake.includes(i) ? "bg-green-500 border border-gray-900" : ""} w-[10px] h-[10px]`} />
                            <div key={i} className={`${snake.includes(i) ? "bg-green-500 border border-gray-900" : food.includes(i) ? "bg-red-500 border-gray-900" : ""} w-[10px] h-[10px]`}  />
                        ))}
                    </div>
                </div>   

                <div className="flex">
                    <div className="flex items-center justify-center p-[13px]">
                        <h1 className="text-8xl">
                            Snake
                            <span className="text-green-500">X</span>
                        </h1>
                    </div>

                    {/* PRAVA HRANA */}
                    <div className="">
                        {Array.from({ length: 15 }).map((_, i) => {
                            const idx = 37 + i;
                            return <div key={idx} className={`${snake.includes(idx) ? "bg-green-500 border border-gray-900" : ""} w-[10px] h-[10px]`} />;
                        })}
                    </div>
                </div>

                {/* SPODNI HRANA */}
                <div className="flex flex-row-reverse">
                    {Array.from({ length: 37 }).map((_, i) => {
                        const idx = 52 + i;
                        return <div key={idx} className={`${snake.includes(idx) ? "bg-green-500 border border-gray-900" : ""} w-[10px] h-[10px]`} />;
                    })}
                </div>

                {/* DOLŮ */}
                <div className="flex">
                    <div className="flex-col">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const idx = 89 + i;
                            return <div key={idx} className={`${snake.includes(idx) ? "bg-green-500 border border-gray-900" : ""} w-[10px] h-[10px]`} />;
                        })}
                    </div>
                    {/* <Link href="/game" className="block mx-auto hover:scale-110 text-4xl cursor-pointer">Play</Link> */}
                    <button 
                        className="block mx-auto hover:scale-110 text-4xl cursor-pointer" 
                        onClick={toggleShowGame}
                        onMouseEnter={handlePlayBtnHoverSound}
                    >
                        Play
                    </button>
                </div>

                {/* DOPRAVA */}
                <div className="flex">
                    {Array.from({ length: 37 }).map((_, i) => {
                            const idx = 94 + i;
                            return <div key={idx} className={`${snake.includes(idx) ? "bg-green-500 border border-gray-900" : ""} w-[10px] h-[10px]`} />;
                    })}
                </div>

                {/* DOLŮ */}
                <div className="flex">
                    <Link 
                        href="/leaderboard" 
                        className="block mx-auto hover:scale-110 text-4xl cursor-pointer"
                        onMouseEnter={handlePlayBtnHoverSound}
                    >
                        Leaderboard
                    </Link>
                    <div className="flex-col">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const idx = 131 + i;
                            return <div key={idx} className={`${snake.includes(idx) ? "bg-green-500 border border-gray-900" : ""} w-[10px] h-[10px]`} />;
                        })}
                    </div>
                </div>

                {/* DOLŮ */}
                <div className="flex">
                    <button 
                        onClick={() => setSettingsModal(true)} 
                        className="block mx-auto hover:scale-110 text-4xl cursor-pointer"
                        onMouseEnter={handlePlayBtnHoverSound}
                    >
                        Settings
                    </button>
                    
                    <div className="flex-col">
                        {Array.from({ length: 5 }).map((_, i) => {
                            const idx = 136 + i;
                            return <div key={idx} className={`${snake.includes(idx) ? "bg-green-500 border border-gray-900" : ""} w-[10px] h-[10px]`} />;
                        })}
                    </div>
                </div>

                {/* DOLEVA */}
                <div className="flex flex-row-reverse">
                    {Array.from({ length: 37 }).map((_, i) => {
                        const idx = 141 + i;
                        return <div key={idx} className={`${snake.includes(idx) ? "bg-green-500 border border-gray-900" : ""} w-[10px] h-[10px]`} />;
                    })}
                </div>

                {/* // TODO - Dokončit modální okno s návodem :) */}
                <button 
                        onClick={() => setSettingsModal(true)} 
                        className="block mx-auto hover:scale-110 text-4xl cursor-pointer"
                        onMouseEnter={handlePlayBtnHoverSound}
                    >
                        How to play
                </button>

            </div>



        </div>

    </div>
  );
};