import { Request, Response } from "express"
import { ListChallengesService } from "../service/listChallengesService"

export class ListChallengesController {
    handle(req: Request, res: Response) {

        const listChallengesService = new ListChallengesService()

        const challenges = listChallengesService.execute()

        return res.status(200).json(challenges)
    }
}