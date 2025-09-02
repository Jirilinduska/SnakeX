"use client"

import { useEffect, useState } from "react"
import { ModalSettings } from "./ModalSettings"
import { ModalLeaderboard } from "./ModalLeaderboard"
import { useSounds } from "@/hooks/useSounds"
import { ModalHowToPlay } from "./ModalHowToPlay"
import { SnakeHead } from "./SnakeHead"

type Props = {
    toggleShowGame: () => void
}

export const SnakeLogo = ({ toggleShowGame } : Props) => {

    const { playButtonHover, playButton } = useSounds()

    const [snake, setSnake] = useState<number[]>(Array.from({ length: 5 }, (_, i) => i))
    const [food, setFood] = useState<number[]>([10,13,15])

    const [modals, setModals] = useState({
        settings: false,
        howToPlay: false,
        leaderboard: false
    })

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
        <ModalLeaderboard 
            open={modals.leaderboard}
            handleClose={() => {
                playButton()
                setModals((prev => ({ ...prev, leaderboard: false })))
            }}  
        />

        <ModalSettings 
            handleClose={() => {
                playButton()
                setModals((prev => ({ ...prev, settings: false })))
            }} 
            open={modals.settings}
        />

        <ModalHowToPlay 
            handleClose={() => {
                playButton()
                setModals((prev => ({ ...prev, howToPlay: false })))
            }} 
            open={modals.howToPlay}
        />



        <div className="flex">

            <div className="flex flex-col-reverse">
                {Array.from({ length: 34 }).map((_, i) => {
                    const idx = 178 + i; // otočení pořadí indexů
                    
                    let bg = ""

                    if (snake.includes(idx)) {
                        bg = "bg-green-500";
                    }

                    if (snake[snake.length - 1] === idx) {
                        return <SnakeHead direction={"down"} size="small" />;
                    }

                    return <div
                        key={idx}
                        className={`${bg} border border-gray-900 w-[10px] h-[10px]`}
                        style={{
                            backgroundImage: food.includes(i)
                            ? "url('/images/apple.png')"
                            : "",
                        backgroundSize: "cover",
                        }}
                    ></div>

                    // if(food.includes(i)) {
                    //     return (

                    //     )
                    // }

                    // if(snake.includes(idx)) {
                    //     return <div key={idx} className="w-[10px] h-[10px] bg-green-500 border border-gray-900"></div>
                    // }
                    // return <div key={idx} className={`${snake.includes(idx) ? "bg-green-500 border border-gray-900" : food.includes(i) ? "bg-red-500 border-gray-900" : ""} w-[10px] h-[10px]`}  />
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
                        onMouseEnter={playButtonHover}
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
                    <button 
                        className="block mx-auto hover:scale-110 text-4xl cursor-pointer"
                        onMouseEnter={playButtonHover}
                        onClick={() => setModals((prev => ({ ...prev, leaderboard: true })))}
                    >
                        Leaderboard
                    </button>
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
                        onClick={() => setModals((prev => ({ ...prev, settings: true })))} 
                        className="block mx-auto hover:scale-110 text-4xl cursor-pointer"
                        onMouseEnter={playButtonHover}
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
                        onClick={() => setModals((prev => ({ ...prev, howToPlay: true })))} 
                        className="block mx-auto hover:scale-110 text-4xl cursor-pointer"
                        onMouseEnter={playButtonHover}
                    >
                        How to play
                </button>

            </div>



        </div>

    </div>
  );
};