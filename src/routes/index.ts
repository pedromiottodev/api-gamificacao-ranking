import { Router } from "express"

import { CreatePlayerController } from "../controller/playersController"

export const router = Router()

router.get("/health", (req, res) => {
    return res.status(200).json({ message: "ok" })
})

router.post("/players", new CreatePlayerController().handle)