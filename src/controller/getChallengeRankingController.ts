import { Request, Response } from "express"
import { z } from "zod"
import { GetChallengeRankingService } from "../service/getChallengeRankingService"

const idValidator = z.uuid()
const limitValidator = z.coerce.number().int().min(1).max(100).default(10)

export class GetChallengeRankingController {
    handle(req: Request, res: Response) {
        const parsedId = idValidator.safeParse(req.params.id)

        if (!parsedId.success) {
            const errors = z.treeifyError(parsedId.error)
            return res.status(400).json({ message: "Dados inválidos", errors })
        }

        const parsedIdLimit = limitValidator.safeParse(req.query.limit)

        if (!parsedIdLimit.success) {
            const errors = z.treeifyError(parsedIdLimit.error)
            return res.status(400).json({ message: "Dados inválidos", errors })
        }

        const service = new GetChallengeRankingService()
        const ranking = service.execute(parsedId.data, parsedIdLimit.data)

        const rankingWithPosition = []
        let lastPoints: number | null = null
        let lastPosition = 0

        for (let i = 0; i < ranking.length; i++) {
            const row = ranking[i]
            const position = lastPoints === row.total_points ? lastPosition : i + 1

            rankingWithPosition.push({ position, ...row })

            lastPoints = row.total_points
            lastPosition = position
        }

        return res.status(200).json(rankingWithPosition)

    }
}