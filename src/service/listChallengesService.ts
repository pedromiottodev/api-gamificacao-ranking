import { db } from "../database/connection"

export class ListChallengesService {

    execute() {
        const challenges = db
        .prepare('SELECT * FROM challenges')
        .all()

        return challenges
    }
}