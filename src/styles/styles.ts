import { DIFFICULTY_EASY, DIFFICULTY_EXTREME, DIFFICULTY_HARD, DIFFICULTY_MEDIUM } from "@/hooks/useSnake"


export const handleDifficultyColor = (difficulty: string) => {
    let value = ""
    switch (difficulty) {
        case DIFFICULTY_EASY:
            value = "text-green-500 border-green-500"
            break;
        case DIFFICULTY_MEDIUM:
            value = "text-blue-500"
            break;
        case DIFFICULTY_HARD:
            value = "text-orange-500"
            break;
        case DIFFICULTY_EXTREME:
            value = "text-red-500"
            break;
        default:
            value = "text-white"
            break;
    }
    return value
}