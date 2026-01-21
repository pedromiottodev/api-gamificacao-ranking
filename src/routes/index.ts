import { Router } from "express"

import { CreatePlayerController } from "../controller/createPlayerController"
import { ListPlayersController } from "../controller/listPlayersController"
import { GetPlayerByIdController } from "../controller/getPlayerByIdController"

import { CreateChallengeController } from "../controller/createChallengeController"
import { ListChallengesController } from "../controller/listChallengesController"
import { GetChallengeByIdController } from "../controller/getChallengeByIdController"

export const router = Router()

router.get("/health", (req, res) => {
    return res.status(200).json({ message: "ok" })
})

//ROTAS DE PLAYERS//
router.post("/players", new CreatePlayerController().handle)
router.get("/players", new ListPlayersController().handle)
router.get("/players/:id", new GetPlayerByIdController().handle)

//ROTAS DE DESAFIO//

router.post("/challenges", new CreateChallengeController().handle)
router.get("/challenges", new ListChallengesController().handle)
router.get("/challenges/:id", new GetChallengeByIdController().handle)
