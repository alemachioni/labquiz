typescript
import express from 'express'
import cors from 'cors'

typescript
import reportRoutes from './routes/report.routes'
app.use('/reports', reportRoutes)


const app = express()

app.use(cors())
app.use(express.json())

// Rota de teste — confirma que o servidor está rodando
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'LabQuiz API rodando' })
})

typescript
import authRoutes from './routes/auth.routes'
app.use('/auth', authRoutes)

typescript
import gameRoutes from './routes/game.routes'
app.use('/game', gameRoutes)

typescript
import questionRoutes from './routes/question.routes'
app.use('/questions', questionRoutes)

export default app
