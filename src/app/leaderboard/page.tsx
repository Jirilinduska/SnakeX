import "../../styles/globals.css"

export default function LeaderboardPage() {
  return (
    <div className="flex items-center justify-center h-screen font-pixely">

      <div className="w-[50%] p-4">

        <div className="grid grid-cols-3 font-bold border-b pb-2">
          <p>User</p>
          <p className="text-center">Difficulty</p>
          <p className="text-right">Score</p>
        </div>

        <div className="grid grid-cols-3 py-1">
          <p>UserKokotus</p>
          <p className="text-center">HARD</p>
          <p className="text-right">2280</p>
        </div>

        <div className="grid grid-cols-3 py-1">
          <p>UserPepe</p>
          <p className="text-center">EASY</p>
          <p className="text-right">120</p>
        </div>
        <div className="grid grid-cols-3 py-1">
          <p>UserPepe</p>
          <p className="text-center">EASY</p>
          <p className="text-right">120</p>
        </div>
        <div className="grid grid-cols-3 py-1">
          <p>UserPepe</p>
          <p className="text-center">EASY</p>
          <p className="text-right">120</p>
        </div>
        <div className="grid grid-cols-3 py-1">
          <p>UserPepe</p>
          <p className="text-center">EASY</p>
          <p className="text-right">120</p>
        </div>
      </div>

    </div>
  );
}