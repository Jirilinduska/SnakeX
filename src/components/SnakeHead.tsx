type Props = {
    direction: "up" | "right" | "left" | "down"
    size: "small" | "big"
}


export const SnakeHead = ({ direction, size } : Props) => {

    const widthHeight = size === "small" ? "w-[10px] " : "w-[20px] h-[20px]"

    const directionClassMap: Record<string, string> = {
        up: "bottom-3/4 right-1/2 translate-x-1/2 rotate-180",
        down: "top-3/4 right-1/2 translate-x-1/2 rotate-0",
        left: "top-1/2 right-3/4 -translate-y-1/2 -rotate-90",
        right: "top-1/2 left-3/4 -translate-y-1/2 rotate-90",
    }

  return (
    <div className={`${widthHeight} bg-green-500 border-gray-900 relative`}> 
        
        <div className="flex items-center justify-around mt-1">
            <div className="w-[5px] h-[5px] bg-black">
                <div className="w-[2px] h-[2px] bg-white"></div>
            </div>
            <div className="w-[5px] h-[5px] bg-black">
                <div className="w-[2px] h-[2px] bg-white"></div>
            </div>
        </div>

        <div className={`absolute ${directionClassMap[direction]}`}>
            <img src="/images/snake_tongue.png" alt="snake tongue" />
        </div>
    </div>
  );
};