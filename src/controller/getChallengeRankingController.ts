import { Request, Response } from "express"
import { z } from "zod"
import { GetChallengeRankingService } from "../service/getChallengeRankingService"

const idValidator = z.string().uuid()
const limitValidator = z.coerce.number().int().min(1).max(100).default(10)

export class GetChallengeRankingController {
    handle(req: Request, res: Response) {
        const parsedId = idValidator.safeParse(req.params.id)

        if (!parsedId.success) {
            return res.status(400).json({
                message: "Id inválido",
                errors: parsedId.error.flatten()
            })
        }

        const parsedLimit = limitValidator.safeParse(req.query.limit)

        if (!parsedLimit.success) {
            return res.status(400).json({
                message: "Limit inválido",
                errors: parsedLimit.error.flatten()
            })
        }

        const service = new GetChallengeRankingService()
        const ranking = service.execute(parsedId.data, parsedLimit.data)

        return res.status(200).json(ranking)
    }
}
