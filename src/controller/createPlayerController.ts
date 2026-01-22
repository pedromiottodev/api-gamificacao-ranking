import { z } from "zod"
import { Request, Response } from "express"
import { CreatePlayerService } from "../service/createPlayerService"

const playerValidator = z.object({
    name: z.string().min(1),
    email: z.email("Email inválido")
})

export class CreatePlayerController {
    handle(req: Request, res: Response) {
        const parsed = playerValidator.safeParse(req.body)

        if (!parsed.success) {
            const errors = z.treeifyError(parsed.error)
            return res.status(400).json(errors)
        }


        const createPlayerService = new CreatePlayerService()

        const player = createPlayerService.execute(parsed.data)

        if (!player.ok) {
            return res.status(player.statusCode).json({ message: player.message })
        }

        return res.status(201).json(player.player)

    }
}