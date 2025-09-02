
type Props = {
    username: string
    score: number
    difficulty: string
}

export const LeaderboardItem = ({ difficulty, score, username } : Props) => {

  const handleClassName = () => {
    let key: string
    switch (difficulty) {
      case "EASY":
        key = "text-green-500"
        break;
      case "MEDIUM":
        key = "text-blue-500"
        break;
      case "HARD":
        key = "text-orange-500"
        break;
      case "EXTREME":
        key = "text-red-500"
        break;
      default:
        key = ""
        break; 
    }
    return key
  }

  return (
    <div className={`${handleClassName()} grid grid-cols-3 py-1`}>
        <p>{username}</p>
        <p className="text-center">
          {difficulty}
        </p>
        <p className="text-right">{score}</p>
    </div>
  );
};