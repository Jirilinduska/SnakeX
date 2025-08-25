import { handleDifficultyColor } from "@/styles/styles";
import { useRef } from "react";

type Props = {
  toggleShowGame: () => void;
  handleGameReset: () => void;
  setDirection: React.Dispatch<
    React.SetStateAction<"up" | "down" | "right" | "left">
  >;
  isStarted: boolean;
  handleStartGame: () => void;
  handleSetGameDifficulty: () => void;
  gameDifficulty: string;
  errMessage: string;
};

export const GameButtons = ({ handleGameReset, toggleShowGame, setDirection, isStarted, handleSetGameDifficulty, handleStartGame, gameDifficulty, errMessage, } : Props) => {

  const btnClickSound = useRef<HTMLAudioElement | null>(null)

  const handlePlayBtnClickSound = () => {
    if (btnClickSound.current) {
      btnClickSound.current.currentTime = 0
      btnClickSound.current.volume = 0.2
      btnClickSound.current.play()
    }
  }

  return (
    <div className="">
      <audio ref={btnClickSound} src="/sounds/btn_click_sound.mp3" />

      {isStarted ? (
        <>
          <div className="flex items-center justify-between py-4 px-10">
            <button
              className="text-xl border border-white p-2 w-20 cursor-pointer"
              onClick={() => {
                handlePlayBtnClickSound()
                toggleShowGame()
              }}
            >
              Menu
            </button>

            <button
              className="text-xl border border-white p-2 w-20 cursor-pointer"
              onClick={() => {
                handlePlayBtnClickSound()
                handleGameReset()
              }}
            >
              Reset
            </button>
          </div>

          <div className="">
            <div className="grid grid-cols-3 grid-rows-3 gap-2 w-full max-w-[130px] aspect-square mx-auto">
              <div></div>
              <button
                onClick={() => setDirection("up")}
                className="border border-amber-100 text-2xl w-full h-full cursor-pointer"
              >
                ⬆️
              </button>
              <div></div>

              <button
                onClick={() => setDirection("left")}
                className="border border-amber-100 text-2xl w-full h-full cursor-pointer"
              >
                ⬅️
              </button>
              <div></div>
              <button
                onClick={() => setDirection("right")}
                className="border border-amber-100 text-2xl w-full h-full cursor-pointer"
              >
                ➡️
              </button>

              <div></div>
              <button
                onClick={() => setDirection("down")}
                className="border border-amber-100 text-2xl w-full h-full cursor-pointer"
              >
                ⬇️
              </button>
              <div></div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center pt-10">
          <button
            className={`${handleDifficultyColor(
              gameDifficulty
            )} text-xl border p-2 w-40 cursor-pointer mb-6`}
            onClick={() => {
              handlePlayBtnClickSound()
              handleSetGameDifficulty()
            }}
          >
            {gameDifficulty === "" ? "Difficulty" : gameDifficulty}
          </button>

          <button
            className="text-xl border border-white p-2 w-40 cursor-pointer mb-4"
            onClick={() => {
              handlePlayBtnClickSound()
              handleStartGame()
            }}
          >
            Start
          </button>

          <p className="text-red-500 text-lg">{errMessage}</p>
        </div>
      )}
    </div>
  );
};
