# API de Ranking com Gamificação

API REST para gerenciar jogadores, desafios e pontuações, gerando ranking dinâmico por desafio.

## Stack
- Node.js + TypeScript
- Express
- SQLite (better-sqlite3)
- Zod (validação)
- dotenv (variáveis de ambiente)
- express-rate-limit (prevenção de abuso)
- tsx (dev)

## Requisitos
- Node 20
- Yarn

## Como rodar
1) Instalar dependências
```bash
yarn
Criar arquivo .env

env
Copiar código
PORT=3333
Rodar API

bash
Copiar código
yarn dev
Endpoints
Health
GET /health

Players
POST /players

GET /players

GET /players/:id

GET /players/:id/stats

Challenges
POST /challenges

GET /challenges

GET /challenges/:id

GET /challenges/:id/ranking?limit=10

Scores
POST /scores (com rate limit)

Regras de negócio implementadas
Email de jogador é único (409)

Não permite pontuação negativa (400)

Não permite pontuar jogador inexistente (404)

Não permite pontuar desafio inexistente (404)

Ranking é calculado dinamicamente (SUM/GROUP BY), não é armazenado pronto

Rate limit no registro de pontuação (429)

Testes manuais
A pasta requests/ contém arquivos .http para testar com a extensão REST Client do VSCode.

yaml
Copiar código

---

## (arquivo .http)

Crie a pasta:
requests/

bash
Copiar código

### 1) `requests.http`
```http
@baseUrl = http://localhost:3333
@json = application/json


### Criar player
POST {{baseUrl}}/players
Content-Type: {{json}}

{
  "name": "Pedro",
  "email": "pedro@teste.com"
}

### Listar players
GET {{baseUrl}}/players
2) requests/challenges.http
http
Copiar código
@baseUrl = http://localhost:3333
@json = application/json

### Criar challenge
POST {{baseUrl}}/challenges
Content-Type: {{json}}

{
  "title": "Desafio 1",
  "description": "Desafio para testes",
  "start_date": "2026-01-01T00:00:00.000Z",
  "end_date": "2026-12-31T23:59:59.999Z"
}

### Listar challenges
GET {{baseUrl}}/challenges
3) requests/scores.http
http
Copiar código
@baseUrl = http://localhost:3333
@json = application/json

### Criar score
POST {{baseUrl}}/scores
Content-Type: {{json}}

{
  "player_id": "COLE_ID_PLAYER",
  "challenge_id": "COLE_ID_CHALLENGE",
  "points": 10
}
4) requests/ranking.http
http
Copiar código
@baseUrl = http://localhost:3333

### Ranking do challenge (top 10)
GET {{baseUrl}}/challenges/COLE_ID_CHALLENGE/ranking?limit=10
5) requests/stats.http
http
Copiar código
@baseUrl = http://localhost:3333

### Stats do player
GET {{baseUrl}}/players/COLE_ID_PLAYER/stats
6) requests/flow.http (fluxo completo)
http
Copiar código
@baseUrl = http://localhost:3333
@json = application/json

### Criar Player A
POST {{baseUrl}}/players
Content-Type: {{json}}

{
  "name": "Player A",
  "email": "playera@teste.com"
}

### Criar Player B
POST {{baseUrl}}/players
Content-Type: {{json}}

{
  "name": "Player B",
  "email": "playerb@teste.com"
}

### Criar Challenge ativo
POST {{baseUrl}}/challenges
Content-Type: {{json}}

{
  "title": "Desafio Ativo",
  "description": "Para testar scores e ranking",
  "start_date": "2026-01-01T00:00:00.000Z",
  "end_date": "2026-12-31T23:59:59.999Z"
}

### Score Player A +10
POST {{baseUrl}}/scores
Content-Type: {{json}}

{
  "player_id": "COLE_ID_PLAYER_A",
  "challenge_id": "COLE_ID_CHALLENGE",
  "points": 10
}

### Score Player A +5
POST {{baseUrl}}/scores
Content-Type: {{json}}

{
  "player_id": "COLE_ID_PLAYER_A",
  "challenge_id": "COLE_ID_CHALLENGE",
  "points": 5
}

### Score Player B +20
POST {{baseUrl}}/scores
Content-Type: {{json}}

{
  "player_id": "COLE_ID_PLAYER_B",
  "challenge_id": "COLE_ID_CHALLENGE",
  "points": 20
}

### Ranking
GET {{baseUrl}}/challenges/COLE_ID_CHALLENGE/ranking?limit=10