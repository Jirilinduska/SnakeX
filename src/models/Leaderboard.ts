import mongoose, { Schema, model, models } from "mongoose"


type TLeaderboard = {
    userID: string,
    username: string,
    score: number,
    difficulty: "EASY" | "MEDIUM" | "HARD" | "EXTREME"

}

const LeaderboardSchema = new Schema<TLeaderboard>({
    userID: { type: String },
    username: { type: String },
    score: { type: Number },
    difficulty: { type: String }
})

export const Leaderboard = models.Leaderboard || model<TLeaderboard>("Leaderboard", LeaderboardSchema)