import { z } from "zod"
import { Request, Response } from "express"
import { CreateScoreService } from "../service/createScoreService"

const scoreValidator = z.object({
    player_id: z.uuid(),
    challenge_id: z.uuid(),
    points: z.number().int().min(0)
})

export class CreateScoreController {
    handle(req: Request, res: Response) {
        const parsed = scoreValidator.safeParse(req.body)

        if (!parsed.success) {
            const errors = z.flattenError(parsed.error)
            return res.status(400).json({ message: "Dados inválidos", errors })
        }

        const createScoreService = new CreateScoreService()

        const result = createScoreService.execute({ player_id: parsed.data.player_id, challenge_id: parsed.data.challenge_id, points: parsed.data.points })

        if (!result.ok) {
            return res.status(result.statusCode).json({ message: result.message })
        }

        return res.status(200).json(result.score)
    }
}