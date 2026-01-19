import { randomUUID } from 'node:crypto'
import { db } from '../database/connection'

type CreatePlayerInput = {
    name: string
    email: string
}

type ServiceResult =
    | { ok: true, player: any }
    | { ok: false, statusCode: number, message: string }


export class CreatePlayerService {
    execute({ name, email }: CreatePlayerInput): ServiceResult {
        const existingPlayer = db
            .prepare('SELECT id FROM players WHERE email = ?')
            .get(email)

        if (existingPlayer) {
            return { ok: false, statusCode: 409, message: 'Email já está em uso' }
        }

        const id = randomUUID()
        const createdAt = new Date().toISOString()

        db.prepare(`
      INSERT INTO players (id, name, email, created_at)
      VALUES (?, ?, ?, ?)
    `).run(id, name, email, createdAt)

        return {
            ok: true,
            player: { id, name, email, created_at: createdAt }
        }
    }
}