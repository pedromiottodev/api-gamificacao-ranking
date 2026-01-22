import { Router } from "express"

import { CreatePlayerController } from "../controller/createPlayerController"
import { ListPlayersController } from "../controller/listPlayersController"
import { GetPlayerByIdController } from "../controller/getPlayerByIdController"

import { CreateChallengeController } from "../controller/createChallengeController"
import { ListChallengesController } from "../controller/listChallengesController"
import { GetChallengeByIdController } from "../controller/getChallengeByIdController"

import { CreateScoreController } from "../controller/createScoreController"

import { GetChallengeRankingController } from "../controller/getChallengeRankingController"
import { GetPlayerStatsController } from "../controller/getPlayerStatsController"

import { rateLimitScore } from "../middlewares/rateLimitScore"

export const router = Router()

const createPlayerController = new CreatePlayerController()
const listPlayersController = new ListPlayersController()
const getPlayerByIdController = new GetPlayerByIdController()

const createChallengeController = new CreateChallengeController()
const listChallengesController = new ListChallengesController()
const getChallengeByIdController = new GetChallengeByIdController()

const createScoreController = new CreateScoreController()

const getChallengeRankingController = new GetChallengeRankingController()
const getPlayerStatsController = new GetPlayerStatsController()

//players
router.post("/players", (req, res) => createPlayerController.handle(req, res))
router.get("/players", (req, res) => listPlayersController.handle(req, res))
router.get("/players/:id", (req, res) => getPlayerByIdController.handle(req, res))

//challenges
router.post("/challenges", (req, res) => createChallengeController.handle(req, res))
router.get("/challenges", (req, res) => listChallengesController.handle(req, res))
router.get("/challenges/:id", (req, res) => getChallengeByIdController.handle(req, res))

//scores com rate limit
router.post("/scores", rateLimitScore, (req, res) => createScoreController.handle(req, res))

//ranking
router.get("/challenges/:id/ranking", (req, res) => getChallengeRankingController.handle(req, res)
)
router.get("/players/:id/stats", (req, res) => getPlayerStatsController.handle(req, res))
