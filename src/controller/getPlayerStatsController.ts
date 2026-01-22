import { Request, Response } from 'express'
import { z } from 'zod'
import { GetPlayerStatsService } from '../service/getPlayerStatsService'

const idValidator = z.uuid()

export class GetPlayerStatsController {
  handle(req: Request, res: Response) {
    const parsedId = idValidator.safeParse(req.params.id)

    if (!parsedId.success) {
      const errors = z.treeifyError(parsedId.error)
      return res.status(400).json({ message: "Dados inválidos", errors })
    }

    const service = new GetPlayerStatsService()
    const result = service.execute(parsedId.data)

    if (!result.ok) {
      return res.status(result.statusCode).json({ message: result.message })
    }

    return res.status(200).json(result.stats)
  }
}
