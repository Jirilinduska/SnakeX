"use client"

import "../styles/globals.css"

export const HowToPlay = ({ stage } : { stage: number }) => {

    const handleTitle = () => {
        let value: string
        switch (stage) {
            case 0:
                value = "Objective"
                break;
            case 1:
                value = "Controls"
                break;
            case 2:
                value = "Difficulty"
                break;
            case 3:
                value = "Food"
                break;
            case 4:
                value = "Boosts"
                break;
            default:
                value = ""
                break;
        }
        return value
    }

  return (
    <div className="text-black mt-2">


        <div className="flex gap-2 mb-2">
            <h3 className="font-bold">
                {handleTitle()}
            </h3> 
            {stage >= 3 && (
                <img src={stage === 3 ? "/images/apple.png" : "/images/slow_boost_emoji.png"} alt="image" className="w-[20px] h-[20px]" />
            )}
        </div>

        <div className="h-20">

            {stage === 0 && (
                <>
                    <p className="text-center mb-1">Control the snake, eat food, grow longer, and score points.</p>
                    <p className="text-center">Do not crash into walls or yourself – that ends the game.</p>
                </>
            )}

            {stage === 1 && (
                <>
                    <p className="">Arrow Up: Move Up</p>
                    <p className="">Arrow Down: Move Down</p>
                    <p className="">Arrow Left: Move Left</p>
                    <p className="">Arrow Right: Move Right</p>
                </>
            )}

            {stage === 2 && (
                <>
                    <p className="mb-1">Choose between 
                        <span className="text-green-500 font-bold mx-1">EASY</span>,
                        <span className="text-blue-500 font-bold mx-1">MEDIUM</span>, 
                        <span className="text-orange-500 font-bold mx-1">HARD</span>, and 
                        <span className="text-red-500 font-bold ml-1">EXTREME</span>.
                    </p>
                    <p>Higher difficulty = faster game speed.</p>
                </>
            )}

            {stage === 3 && (
                <>
                    <p className="mb-1">At first only one food spawns.</p>
                    <p className="mb-1">From <span className="mx-1 font-numbers">5</span> points, multiple food can appear.</p>
                    <p className="mb-1">Each food increases score, length, and speed slightly.</p>
                </>
            )}

            {stage === 4 && (
                <>
                    <div className="mb-2 flex gap-2">
                        <img className="w-[20px]" src="/images/speed_boost_emoji.png" />
                        <p>Speed Boost: temporary speed up <span className="mx-1 font-numbers">(5s)</span></p>
                    </div>
                    <div className="mb-2 flex gap-2">
                        <img className="w-[20px]" src="/images/slow_boost_emoji.png" />
                        <p>Slow Boost: temporary slow down <span className="mx-1 font-numbers">(5s)</span></p>
                    </div>
                    <p className="mb-1">Boosts appear every <span className="ml-1 font-numbers">~20s</span>, disappear after <span className="mx-1 font-numbers">10s</span>.</p>
                </>
            )}
        </div>

    </div>
  )
}