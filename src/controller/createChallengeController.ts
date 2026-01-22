import { z } from "zod"
import { Request, Response } from "express"
import { CreateChallengeService } from "../service/createChallengeService"

const challengeValidator = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    start_date: z.string().min(1),
    end_date: z.string().min(1)
})

export class CreateChallengeController {
    handle(req: Request, res: Response) {
        const parsed = challengeValidator.safeParse(req.body)

        if (!parsed.success) {
            const errors = z.flattenError(parsed.error)
            return res.status(400).json({ message: "Dados inválidos", errors })
        }

        const startMs = Date.parse(parsed.data.start_date)
        const endMs = Date.parse(parsed.data.end_date)

        if (Number.isNaN(startMs) || Number.isNaN(endMs)) {
            return res.status(400).json({
                message: "Datas inválidas. Use formato ISO (ex: 2026-01-20T10:00:00.000Z)"
            })
        }

        if (endMs < startMs) {
            return res.status(400).json({
                message: "A data de término não pode ser menor que a data de início"
            })
        }


        const createChallengeService = new CreateChallengeService()

        const challenge = createChallengeService.execute(parsed.data)

        if (!challenge.ok) {
            return res.status(challenge.statusCode).json({ message: challenge.message })
        }

        return res.status(201).json(challenge.challenge)

    }
}

