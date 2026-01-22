import { db } from '../database/connection'

type BestChallenge = {
  challenge_id: string
  total_points: number
}

type PlayerStats = {
  player_id: string
  total_points: number
  challenges_participated: number
  best_challenge: BestChallenge | null
}

type ServiceResult =
  | { ok: true, stats: PlayerStats }
  | { ok: false, statusCode: number, message: string }

export class GetPlayerStatsService {
  execute(playerId: string): ServiceResult {
    const player = db
      .prepare('SELECT id FROM players WHERE id = ?')
      .get(playerId) as { id: string } | undefined

    if (!player) {
      return { ok: false, statusCode: 404, message: 'Jogador não encontrado' }
    }

    const totalRow = db
      .prepare(`
        SELECT COALESCE(SUM(points), 0) AS total_points
        FROM scores
        WHERE player_id = ?
      `)
      .get(playerId) as { total_points: number }

    const participatedRow = db
      .prepare(`
        SELECT COUNT(DISTINCT challenge_id) AS challenges_participated
        FROM scores
        WHERE player_id = ?
      `)
      .get(playerId) as { challenges_participated: number }

    const bestRow = db
      .prepare(`
        SELECT challenge_id, SUM(points) AS total_points
        FROM scores
        WHERE player_id = ?
        GROUP BY challenge_id
        ORDER BY total_points DESC
        LIMIT 1
      `)
      .get(playerId) as BestChallenge | undefined

    return {
      ok: true,
      stats: {
        player_id: playerId,
        total_points: totalRow.total_points,
        challenges_participated: participatedRow.challenges_participated,
        best_challenge: bestRow ?? null
      }
    }
  }
}
