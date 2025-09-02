"use client";

import "../styles/globals.css";
import { GameButtons } from "./GameButtons";
import { handleDifficultyColor } from "@/styles/styles";
import { SnakeHead } from "./SnakeHead";
import { useSnake } from "@/hooks/useSnake";

// const ARRAY_LENGTH = 450
const COLS = 30
const ROWS = 15
const ARRAY_LENGTH = COLS * ROWS

type Props = {
  toggleShowGame: () => void
}

export const GameGrid = ({ toggleShowGame }: Props) => {

  const {
    direction,
    errMessage,
    food,
    gameDifficulty,
    gameOver,
    gameScore,
    gameSpeed,
    handleGameReset,
    handleSetGameDifficulty,
    handleStartGame,
    isStarted,
    snake,
    setDirection,
    speedBoost,
    slowBoost
  } = useSnake(COLS, ROWS, ARRAY_LENGTH)

  return (
    <div className="bg-black h-screen flex justify-center items-center font-pixely">
      <div className="border-2 h-[600px] w-[600px]">
        <div className="flex items-center justify-between p-2">
          <div className="">
            <span className="uppercase mr-3">Score:</span>
            <span className={`${handleDifficultyColor(gameDifficulty)}`}>
              {gameScore}
            </span>
          </div>
          <div className="">
            <span className="uppercase mr-3">Difficulty:</span>
            <span className={`${handleDifficultyColor(gameDifficulty)}`}>
              {gameDifficulty || "---"}
            </span>
          </div>
          <div className="p-2">
            <span className="uppercase mr-3">Speed:</span>
            <span className={`${handleDifficultyColor(gameDifficulty)}`}>
              {gameSpeed}
            </span>
          </div>
        </div>

        <div
          className="bg-black h-[300px] grid gap-0 relative"
          style={{
            gridTemplateColumns: `repeat(${COLS}, minmax(0, 20px))`,
            gridTemplateRows: `repeat(${ROWS}, 20px)`,
          }}
        >
          {[...Array(ARRAY_LENGTH)].map((_, index) => {
            let bg = "bg-gray-800";

            if (snake[snake.length - 1] === index) {
              return <SnakeHead key={index} direction={direction} size="big" />;
            }

            if (snake.includes(index) && !gameOver) {
              bg = "bg-green-500";
            } else if (snake.includes(index) && gameOver) {
              bg = "bg-orange-500";
            }

            return (
              <div
                key={index}
                className={`${bg} border border-gray-900 w-[20px] h-[20px]`}
                style={{
                  backgroundImage: food.includes(index)
                    ? "url('/images/apple.png')"
                    : speedBoost.includes(index)
                        ? "url('/images/speed_boost_emoji.png')"
                        : slowBoost.includes(index)
                            ? "url('/images/slow_boost_emoji.png')"
                            : "",
                  backgroundSize: "cover",
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