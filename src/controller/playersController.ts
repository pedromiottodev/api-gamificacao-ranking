import { z } from "zod"
import { Request, Response } from "express"
import { CreatePlayerService } from "../service/playersService"

const createPlayerValidator = z.object({
    name: z.string().min(1),
    email: z.string().email()
})

export class CreatePlayerController {
    handle(req: Request, res: Response) {
        const parsed = createPlayerValidator.safeParse(req.body)

        if (!parsed.success) {
            return res.status(400).json({
                message: "Dados inválidos",
                errors: parsed.error.flatten()
            })
        }

        const createPlayerService = new CreatePlayerService()

        const player = createPlayerService.execute(parsed.data)

        if (!player.ok) {
            return res.status(player.statusCode).json({ message: player.message })
        }

        return res.status(201).json(player.player)

    }
}


