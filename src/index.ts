import express from "express"
import { router } from "./routes/index"
import 'dotenv/config'
import { runMigrations } from './database/migrations'

const app = express()

runMigrations()
app.use(express.json())
app.use(router)


const port = Number(process.env.PORT) || 3000

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`)
})