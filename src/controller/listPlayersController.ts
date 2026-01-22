import { Request, Response } from "express"
import { ListPlayersService } from "../service/listPlayersService"

export class ListPlayersController {
    handle(req: Request, res: Response) {

        const listPlayerService = new ListPlayersService()

        const players = listPlayerService.execute()

        return res.status(200).json(players)

    }
}