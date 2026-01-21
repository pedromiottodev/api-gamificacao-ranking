import { db } from '../database/connection'

export class ListPlayersService {
    
    execute() {
        const players = db
        .prepare('SELECT * FROM players')
        .all()

        return players
    }
}  