import { z } from "zod"
import { Request, Response } from "express"
import { GetChallengeByIdService } from "../service/getChallengeByIdService"

const idValidator = z.string().uuid()


export class GetChallengeByIdController {
    handle(req: Request, res: Response) {
        const parsed = idValidator.safeParse(req.params.id)

        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados inválidos",
                errors: parsed.error.flatten()
            })
        }

        const getChallengeByIdService = new GetChallengeByIdService()

        const result = getChallengeByIdService.execute({ id: parsed.data })

        if (!result.ok) {
            return res.status(result.statusCode).json({ message: result.message })
        }

        return res.status(200).json(result.challenge)
    }
}