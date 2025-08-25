import { SnakeLogo } from "./SnakeLogo"
import "../styles/globals.css"


type Props = {
    toggleShowGame: () => void
}

export const Menu = ({ toggleShowGame } : Props) => {
  return (
    <div className="h-screen flex items-center justify-center font-pixely">
        <SnakeLogo toggleShowGame={toggleShowGame} />
    </div>
  );
};