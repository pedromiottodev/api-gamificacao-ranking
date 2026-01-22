import { db } from '../database/connection'

type Id = {
    id: string
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

export class GetChallengeByIdService {
    execute({ id }: Id): ServiceResult {

        const challenge = db
            .prepare('SELECT * FROM challenges WHERE id = ?')
            .get(id) as Challenge | undefined

        if (!challenge) {
            return { ok: false, statusCode: 404, message: "Id não encontrado" }
        }

        return { ok: true, challenge }
    }
}