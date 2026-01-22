import { db } from "../database/connection"

type RankingRow = {
    player_id: string
    name: string
    email: string
    total_points: number
}

export class GetChallengeRankingService {
    execute(challengeId: string, limit = 10) {
        const rows = db.prepare(`
      SELECT
        p.id AS player_id,
        p.name,
        p.email,
        SUM(s.points) AS total_points
      FROM scores s
      JOIN players p ON p.id = s.player_id
      WHERE s.challenge_id = ?
      GROUP BY p.id, p.name, p.email
      ORDER BY total_points DESC
      LIMIT ?
    `).all(challengeId, limit) as RankingRow[]

        return rows
    }
}
