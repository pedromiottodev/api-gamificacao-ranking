import { db } from '../database/connection'


type Player = {
    id: string
    name: string
    email: string
    created_at: string
}

type ServiceResult =
    | { ok: true, player: Player }
    | { ok: false, statusCode: number, message: string }

type Id = {
    id: string
}

export class GetPlayerByIdService {
    execute({ id }: Id): ServiceResult {
        const player = db
            .prepare('SELECT id, name, email, created_at FROM players WHERE id = ?')
            .get(id) as Player | undefined

        if (!player) {
            return { ok: false, statusCode: 404, message: "Id não encontrado" }
        }

        return { ok: true, player }
    }
}