import { randomUUID } from 'node:crypto'
import { db } from "../database/connection"

type ScoreInput = {
    player_id: string,
    challenge_id: string,
    points: number
}

type Score = {
    id: string,
    player_id: string,
    challenge_id: string,
    points: number,
    created_at: string
}


type ServiceResult =
    | { ok: true, score: Score }
    | { ok: false, statusCode: number, message: string }


export class CreateScoreService {
    execute({ player_id, challenge_id, points }: ScoreInput): ServiceResult {

        //verificando se jogador existe
        const player = db
            .prepare('SELECT id FROM players WHERE id = ?')
            .get(player_id)

        if (!player) {
            return { ok: false, statusCode: 404, message: 'Jogador não encontrado' }
        }

        //verificando se challenge existe
        const challenge = db
            .prepare('SELECT start_date, end_date FROM challenges WHERE id = ?')
            .get(challenge_id) as { start_date: string, end_date: string } | undefined

        if (!challenge) {
            return { ok: false, statusCode: 404, message: 'Desafio não encontrado' }
        }

        //verificando se o challenge está dentro do período
        const now = Date.now()
        const startMs = Date.parse(challenge.start_date)
        const endMs = Date.parse(challenge.end_date)

        if (now < startMs || now > endMs) {
            return { ok: false, statusCode: 400, message: 'Fora do período do desafio' }
        }

        if (Number.isNaN(startMs) || Number.isNaN(endMs)) return { ok:false, statusCode: 500, message: 'Período do desafio inválido' }

        const id = randomUUID()
        const created_at = new Date().toISOString()

        db.prepare(`
            INSERT INTO scores (id, player_id, challenge_id, points, created_at)
            VALUES (?, ?, ?, ?, ?)`
        ).run(id, player_id, challenge_id, points, created_at)

        return {
            ok: true,
            score: { id, player_id, challenge_id, points, created_at }
        }
    }
}
