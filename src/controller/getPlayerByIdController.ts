import { z } from "zod"
import { Request, Response } from "express"
import { GetPlayerByIdService } from "../service/getPlayerByIdService"

const idValidator = z.string().uuid()

export class GetPlayerByIdController {
    handle(req: Request, res: Response) {
        const parsed = idValidator.safeParse(req.params.id)

        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados inválidos",
                errors: parsed.error.flatten()
            })
        }

        const getPlayerByIdService = new GetPlayerByIdService()

        const result = getPlayerByIdService.execute({ id: parsed.data })

        if (!result.ok) {
            return res.status(result.statusCode).json({ message: result.message })
        }

        return res.status(200).json(result.player)

    }
}