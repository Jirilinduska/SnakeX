import { snakeGameOverArray, snakeXLogoArray } from "@/constants/snakePositions"
import { useEffect, useState } from "react"
import { useSounds } from "./useSounds"

export const DIFFICULTY_EASY = "EASY"
export const DIFFICULTY_MEDIUM = "MEDIUM"
export const DIFFICULTY_HARD = "HARD"
export const DIFFICULTY_EXTREME = "EXTREME"

const START_SCORE = 0

const SPEED_EASY = 400
const SPEED_MEDIUM = 300
const SPEED_HARD = 200
const SPEED_EXTREME = 100

const SNAKE_LENGTH = 3

const BOOST_DURATION = 5000 // 5s
const BOOST_WILL_DISSAPEAR = 10000 // 10s
const BOOST_SPANW_CHANCE = 0.7 // 70%
const BOOST_SPAWN_INTERVAL = 20000 // 20s

export const useSnake = (COLS: number, ROWS: number, ARRAY_LENGTH: number) => {

    const { playEat, playErrorMsg, playGameOver } = useSounds()

    const [snake, setSnake] = useState<number[]>(snakeXLogoArray) // Pozice hada
    const [food, setFood] = useState<number[]>([]) // Pozice jídla 
    const [speedBoost, setSpeedBoost] = useState<number[]>([])
    const [slowBoost, setSlowBoost] = useState<number[]>([])
    const [direction, setDirection] = useState<"left" | "right" | "up" | "down">("right") // směr pohybu
    const [gameSpeed, setGameSpeed] = useState(SPEED_MEDIUM) // rychlost hry 
    const [gameScore, setGameScore] = useState(START_SCORE) // skóre hry
    const [snakeLength, setSnakeLength] = useState(SNAKE_LENGTH) // délka hada
    const [isStarted, setIsStarted] = useState(false) // je hra aktivní?
    const [gameDifficulty, setGameDifficulty] = useState<string>("") // obtížnost 
    const [errMessage, setErrMessage] = useState<string>("") // chybná zpráva
    const [gameOver, setGameOver] = useState(false) // Konec hry

    // Odstartování hry 
    const handleStartGame = () => {
        if(gameDifficulty === "") {
            setErrMessage("Please select difficulty")
            playErrorMsg()
            return
        }
        setGameOver(false)
        setIsStarted(true)
        setErrMessage("")
    }

    // Nastavení obtížnosti
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

    // Reset hry
    const handleGameReset = () => {
        setSnake(getStartingSnakePosition())
        getFoodPosition()
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

    // Ukončení hry
    const handleFinishGame = async() => {
        setGameOver(true)
        playGameOver()
        setSnake(snakeGameOverArray)
        setFood([])

        let userID = localStorage.getItem("userID_snakeX")
        if (!userID) {
            userID = crypto.randomUUID()
          localStorage.setItem("userID_snakeX", userID)
        }

        const res = await fetch("/api/leaderboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: userID,
                username: localStorage.getItem("username"),
                score: gameScore,
                difficulty: gameDifficulty
            })
        })

        if(res.ok) console.log("ULOŽŠNO") // TODO 
    }

    const getRandomPosition = () => Math.floor(Math.random() * ARRAY_LENGTH)

    const getFoodPosition = () => {
        if(gameScore >= 5) {
        const newPosition = getMultipleFoodPosition()
        setFood(newPosition)
        } else {
        const newPosition = getSingleFoodPosition()
        setFood(newPosition)
        }
    }

    const getSpeedBoostPosition = () => {
        let boost = getRandomPosition()
        while(snake.includes(boost) || food.includes(boost) || slowBoost.includes(boost)) {
            boost = getRandomPosition()
        }
        return [boost]
    }

    const getSlowBoostPosition = () => {
        let boost = getRandomPosition()
        while(snake.includes(boost) || food.includes(boost) || speedBoost.includes(boost)) {
            boost = getRandomPosition()
        }
        return [boost]
    }

    const spawnSpeedBoost = () => {
        const boost = getSpeedBoostPosition()
        setSpeedBoost(boost)
        setTimeout(() => setSpeedBoost([]), BOOST_WILL_DISSAPEAR)
    }

    const spawnSlowBoost = () => {
        const boost = getSlowBoostPosition()
        setSlowBoost(boost)
        setTimeout(() => setSlowBoost([]), BOOST_WILL_DISSAPEAR)
    }

    const getSingleFoodPosition = () => {
        let food = getRandomPosition()
        while(snake.includes(food)) {
            food = getRandomPosition()
        }
        return [food]
    }

    const getMultipleFoodPosition = () => {
        let f1 = getRandomPosition()
        while (snake.includes(f1)) {
            f1 = getRandomPosition()
        }
        let f2 = getRandomPosition()
        while (snake.includes(f2) || f2 === f1) {
            f2 = getRandomPosition()
        }
        return [f1, f2]
    }

    const getStartingSnakePosition = () => {
        const startX = Math.floor(Math.random() * (COLS - 3))
        const startY = Math.floor(Math.random() * ROWS)
        const startIndex = startY * COLS + startX
        return [startIndex, startIndex + 1, startIndex + 2]
    }

    // Start hry
    useEffect(() => {
        if(!isStarted) return
        setSnake(getStartingSnakePosition())
        setFood(getSingleFoodPosition())
    }, [isStarted])

    // Pohyb hada
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

            if (speedBoost.includes(newHead)) {
                setSpeedBoost([])
                setSlowBoost([])
                setGameSpeed(prev => Math.max(40, prev - 50))
              
                setTimeout(() => {
                  setGameSpeed(prev => prev + 50)
                }, BOOST_DURATION)
              }
  
            if (slowBoost.includes(newHead)) {
                setSlowBoost([])
                setSpeedBoost([])
                setGameSpeed(prev => prev + 50)
              
                setTimeout(() => {
                  setGameSpeed(prev => Math.max(40, prev - 50))
                }, BOOST_DURATION)
            }

            let newSnake = [...prevSnake]

            if (food.includes(newHead)) {
                playEat()
                newSnake = [...prevSnake, newHead]
                setGameScore(prev => prev + 1)
                setSnakeLength(prev => prev + 1)
                getFoodPosition()
                setGameSpeed(prev => (prev > 40 ? prev - 2 : prev))
              } else {
                newSnake = [...prevSnake.slice(1), newHead]
              }

            return newSnake
        })
        }, gameSpeed)

        return () => clearInterval(interval);
    }, [direction, gameOver, gameSpeed, gameScore, snakeLength, isStarted])


    // Směr hada
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

    useEffect(() => {
        if (!isStarted || gameOver) return
        const interval = setInterval(() => {
          if (Math.random() < BOOST_SPANW_CHANCE) {
            spawnSpeedBoost()
            spawnSlowBoost()
          }
        }, BOOST_SPAWN_INTERVAL)
      
        return () => clearInterval(interval)
      }, [isStarted, gameOver])

    return {
        snake,
        food,
        direction,
        gameSpeed,
        gameScore,
        isStarted,
        gameDifficulty,
        errMessage,
        gameOver,
        speedBoost,
        slowBoost,
        handleGameReset,
        handleSetGameDifficulty,
        handleStartGame,
        setDirection,
    }
}