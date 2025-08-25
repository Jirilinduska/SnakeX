"use client"

import { useEffect, useRef, useState } from "react"
import "../styles/globals.css"
import { GameButtons } from "./GameButtons"
import { handleDifficultyColor } from "@/styles/styles"
import { snakeGameOverArray, snakeXLogoArray } from "@/constants/snakePositions"

// const ARRAY_LENGTH = 450
const COLS = 30
const ROWS = 15
const ARRAY_LENGTH = COLS * ROWS

export const DIFFICULTY_EASY = "EASY"
export const DIFFICULTY_MEDIUM = "MEDIUM"
export const DIFFICULTY_HARD = "HARD"
export const DIFFICULTY_EXTREME = "EXTREME"

const SNAKE_LENGTH = 3
const START_SCORE = 0

const SPEED_EASY = 400
const SPEED_MEDIUM = 300
const SPEED_HARD = 200
const SPEED_EXTREME = 100

type Props = {
    toggleShowGame: () => void
}

export const GameGrid = ({ toggleShowGame } : Props) => {

    // ============ SOUNDS ============  
    const errMsgSoundRef = useRef<HTMLAudioElement | null>(null)
    const eatingSoundRef = useRef<HTMLAudioElement | null>(null)
    const gameoverSoundRef = useRef<HTMLAudioElement | null>(null)

    // ERROR MESSAGE SOUND
    const handlePlayErrMsgSound = () => {
        if(errMsgSoundRef.current) {
            errMsgSoundRef.current.currentTime = 0
            errMsgSoundRef.current.volume = 0.7
            errMsgSoundRef.current.play()
          }
    }

    // EATING SOUND
    const handlePlayEatingSound = () => {
        if(eatingSoundRef.current) {
            eatingSoundRef.current.currentTime = 0
            eatingSoundRef.current.volume = 0.3
            eatingSoundRef.current.play()
          }
    }

    // GAME OVER SOUND 
    const handlePlayGameOverSound = () => {
        if(gameoverSoundRef.current) {
            gameoverSoundRef.current.currentTime = 0
            gameoverSoundRef.current.volume = 0.3
            gameoverSoundRef.current.play()
          }
    }


    const getStartingSnakePosition = () => {
        const startX = Math.floor(Math.random() * (COLS - 3))
        const startY = Math.floor(Math.random() * ROWS);
        const startIndex = startY * COLS + startX;
        return [startIndex, startIndex + 1, startIndex + 2]
    }

    const getFoodPosition = () => {
        if(gameScore >= 5) {
        const newPosition = getMultipleFoodPosition()
        setFood(newPosition)
        } else {
        const newPosition = getSingleFoodPosition()
        setFood(newPosition)
        }
    }

    const getSingleFoodPosition = () => {
        let food = Math.floor(Math.random() * ARRAY_LENGTH)
        while(snake.includes(food)) {
            food = Math.floor(Math.random() * ARRAY_LENGTH)
        }
        return [food]
    }

    const getMultipleFoodPosition = () => {
        let f1 = Math.floor(Math.random() * ARRAY_LENGTH)
        while (snake.includes(f1)) {
            f1 = Math.floor(Math.random() * ARRAY_LENGTH)
        }
        let f2 = Math.floor(Math.random() * ARRAY_LENGTH)
        while (snake.includes(f2) || f2 === f1) {
            f2 = Math.floor(Math.random() * ARRAY_LENGTH);
        }
        return [f1, f2]
    }

    const handleGameReset = () => {
        setSnake(getStartingSnakePosition())
        setGameOver(false)
        setGameScore(START_SCORE)
        setDirection("right")
        switch (gameDifficulty) {
            case DIFFICULTY_EASY:
                setGameSpeed(SPEED_EASY)
                break;
            case DIFFICULTY_MEDIUM:
                setGameSpeed(SPEED_MEDIUM)
                break;
            case DIFFICULTY_HARD:
                setGameSpeed(SPEED_HARD)
                break;
            case DIFFICULTY_EXTREME:
                setGameSpeed(SPEED_EXTREME)
                break;
            default:
                setGameSpeed(SPEED_MEDIUM)
                setGameDifficulty(DIFFICULTY_MEDIUM)
                break;
        }
    }

    const [snake, setSnake] = useState<number[]>(snakeXLogoArray) // Pozice hada
    const [food, setFood] = useState<number[]>([]) // Pozice jídla 
    const [direction, setDirection] = useState<"left" | "right" | "up" | "down">("right") // směr pohybu
    const [gameSpeed, setGameSpeed] = useState(SPEED_MEDIUM) // rychlost hry 
    const [gameScore, setGameScore] = useState(START_SCORE) // skóre hry
    const [snakeLength, setSnakeLength] = useState(SNAKE_LENGTH) // délka hada
    const [isStarted, setIsStarted] = useState(false) // je hra aktivní?
    const [gameDifficulty, setGameDifficulty] = useState<string>("") // obtížnost 
    const [errMessage, setErrMessage] = useState<string>("") // chybná zpráva
    const [gameOver, setGameOver] = useState(false) // Konec hry

    const handleFinishGame = () => {
        setGameOver(true)
        handlePlayGameOverSound()
        setSnake(snakeGameOverArray)
        setFood([])
    }

    const handleStartGame = () => {
        if(gameDifficulty === "") {
            setErrMessage("Please select difficulty")
            handlePlayErrMsgSound()
            return
        }
        setGameOver(false)
        setIsStarted(true)
        setErrMessage("")
    }

    const handleSetGameDifficulty = () => {
        switch (gameDifficulty) {
            case "":
                setGameDifficulty(DIFFICULTY_EASY)
                setGameSpeed(SPEED_EASY)
                break;
            case DIFFICULTY_EASY:
                setGameDifficulty(DIFFICULTY_MEDIUM)
                setGameSpeed(SPEED_MEDIUM)
                break;
            case DIFFICULTY_MEDIUM:
                setGameDifficulty(DIFFICULTY_HARD)
                setGameSpeed(SPEED_HARD)
                break;
            case DIFFICULTY_HARD:
                setGameDifficulty(DIFFICULTY_EXTREME)
                setGameSpeed(SPEED_EXTREME)
                break;  
            case DIFFICULTY_EXTREME:
                setGameDifficulty(DIFFICULTY_EASY)
                setGameSpeed(SPEED_EASY)
                break;  
            default:
                setGameDifficulty("")
                break;
        }
    }

    useEffect(() => {
        if(!isStarted) return
        setSnake(getStartingSnakePosition())
        setFood(getSingleFoodPosition())
    }, [isStarted])

    useEffect(() => {
        if(gameOver || !isStarted) return
        const interval = setInterval(() => {
        setSnake((prevSnake) => {
            const head = prevSnake[prevSnake.length - 1];
            let newHead = head

            if (direction === "right") newHead = head + 1;
            if (direction === "left") newHead = head - 1;
            if (direction === "up") newHead = head - COLS;
            if (direction === "down") newHead = head + COLS;

            const hitWall = 
                newHead < 0 || newHead >= ARRAY_LENGTH || 
                (direction === "right" && (head % COLS === COLS - 1)) || 
                (direction === "left" && (head % COLS === 0))
            
            const hitSelf = prevSnake.includes(newHead)

            if(hitWall || hitSelf) {
                handleFinishGame()
                return prevSnake
            }

            let newSnake = [...prevSnake]

            if (food.includes(newHead)) {
                handlePlayEatingSound()
                newSnake = [...prevSnake, newHead]
                setGameScore(gameScore + 1)
                setSnakeLength(snakeLength + 1)
                getFoodPosition()
                if(gameSpeed > 40) {
                    setGameSpeed(gameSpeed - 2)
                }
            } else {
                newSnake = [...prevSnake.slice(1), newHead]
            }

            return newSnake
        })
        }, gameSpeed)

        return () => clearInterval(interval);
    }, [direction, gameOver, gameSpeed, gameScore, snakeLength, isStarted])


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
        e.preventDefault()
        setDirection(prev => {
            if (e.key === "ArrowUp" && prev !== "down") return "up"
            if (e.key === "ArrowDown" && prev !== "up") return "down"
            if (e.key === "ArrowLeft" && prev !== "right") return "left"
            if (e.key === "ArrowRight" && prev !== "left") return "right"
            return prev
        })
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])


  return (
    <div className="bg-black h-screen flex justify-center items-center font-pixely">

        {/* Error message sound   */}
        <audio ref={errMsgSoundRef} src="/sounds/err_msg_sound.wav" />
        {/* Eating sound */}
        <audio ref={eatingSoundRef} src="/sounds/eating_sound.wav" />
        {/* Game over sound */}
        <audio ref={gameoverSoundRef} src="/sounds/gameover_sound.wav" />

        <div className="border-2 h-[600px] w-[600px]">

            <div className="flex items-center justify-between p-2">
            <div className="">
                <span className="uppercase mr-3">Score:</span>
                <span className={`${handleDifficultyColor(gameDifficulty)}`}>{gameScore}</span>
            </div>
            <div className="">
                <span className="uppercase mr-3">Difficulty:</span>
                <span className={`${handleDifficultyColor(gameDifficulty)}`}>{gameDifficulty || "---" }</span>
            </div>
            <div className="p-2">
                <span className="uppercase mr-3">Speed:</span>
                <span className={`${handleDifficultyColor(gameDifficulty)}`}>{gameSpeed}</span>
            </div>
            </div>

            <div
            className="bg-black h-[300px] grid gap-0 relative"
            style={{
                gridTemplateColumns: `repeat(${COLS}, minmax(0, 20px))`,
                gridTemplateRows: `repeat(${ROWS}, 20px)`,
            }}
            >

                {/* // TODO  */}
                {/* {gameOver && (
                    <div className="absolute top-0 left-0 w-full h-full bg-white"></div>
                )} */}

                {[...Array(ARRAY_LENGTH)].map((_, index) => {
                    let bg = "bg-gray-800"

                    if (snake.includes(index) && !gameOver) {
                        bg = "bg-green-500"
                    } else if(snake.includes(index) && gameOver) {
                        bg = "bg-orange-500"
                    }

                    // else if (food.includes(index)) {
                    //     bg = "bg-red-500"
                    // }

                    return (
                        <div 
                            key={index} 
                            className={`${bg} border border-gray-900 w-[20px] h-[20px]`}
                            style={{
                                backgroundImage: food.includes(index) ? "url('/images/apple.png')" : "",
                                backgroundSize: "cover"
                            }}
                        ></div>
                    );
                })}
            </div>

            <GameButtons
                errMessage={errMessage}
                gameDifficulty={gameDifficulty}
                handleGameReset={handleGameReset}
                handleSetGameDifficulty={handleSetGameDifficulty}
                handleStartGame={handleStartGame}
                isStarted={isStarted}
                setDirection={setDirection}
                toggleShowGame={toggleShowGame}
            />

        </div>

    </div>
  )
}