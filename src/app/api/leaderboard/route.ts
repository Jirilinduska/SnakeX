import { connectDB } from "@/lib/mongoDB"
import { Leaderboard } from "@/models/Leaderboard"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    await connectDB()
    // const data = await Leaderboard.find()
    // console.log(data)
    const data = await Leaderboard.aggregate([
        {
            $group: {
                _id: { userID: "$userID", difficulty: "$difficulty" },
                username: { $first: "$username" },
                score: { $max: "$score" }
            }
        },
        {
            $project: {
                _id: 0,
                userID: "$_id.userID",
                username: 1,
                difficulty: "$_id.difficulty",
                score: 1
            }
        }
    ])
    
    return NextResponse.json({ data, status: 200 })
}

export async function POST(req: NextRequest) {
    const data = await req.json()
    await connectDB()
    await Leaderboard.create({
        userID: data.userID,
        username: data.username,
        score: data.score,
        difficulty: data.difficulty

    })
    return NextResponse.json({ status: 200 })
}