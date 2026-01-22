import { z } from "zod"
import { Request, Response } from "express"
import { GetChallengeByIdService } from "../service/getChallengeByIdService"

const idValidator = z.uuid()

export class GetChallengeByIdController {
    handle(req: Request, res: Response) {
        const parsed = idValidator.safeParse(req.params.id)

        if (!parsed.success) {
            const errors = z.flattenError(parsed.error)
            return res.status(400).json({ message: "Dados inválidos", errors })
        }

        const getChallengeByIdService = new GetChallengeByIdService()

        const result = getChallengeByIdService.execute({ id: parsed.data })

        if (!result.ok) {
            return res.status(result.statusCode).json({ message: result.message })
        }

        return res.status(200).json(result.challenge)
    }
}