import { randomUUID } from 'node:crypto'
import { db } from '../database/connection'


type CreateChallengeInput = {
    title: string,
    description: string,
    start_date: string,
    end_date: string
}

type Challenge = {
    id: string
    title: string
    description: string
    start_date: string
    end_date: string
    created_at: string
}

type ServiceResult =
    | { ok: true, challenge: Challenge }
    | { ok: false, statusCode: number, message: string }


export class CreateChallengeService {
    execute({ title, description, start_date, end_date }: CreateChallengeInput): ServiceResult {
        const id = randomUUID()
        const created_at = new Date().toISOString()

        const existingId = db
            .prepare('SELECT * FROM challenges WHERE description = ?')
            .get(description)
        
        if (existingId) {
            return { ok: false, statusCode: 409, message: "Descrição já cadastrada" }
        }
        
        db.prepare(`
            INSERT INTO challenges (id, title, description, start_date, end_date, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
        `).run(id, title, description, start_date, end_date, created_at)

        return {
            ok: true,
            challenge: { id, title, description, start_date, end_date, created_at }
        }
    }
}
