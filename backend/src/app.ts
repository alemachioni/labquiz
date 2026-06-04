import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import gameRoutes from './routes/game.routes.js'
import questionRoutes from './routes/question.routes.js'
import reportRoutes from './routes/report.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'LabQuiz API rodando' })
})

app.use('/auth', authRoutes)
app.use('/game', gameRoutes)
app.use('/questions', questionRoutes)
app.use('/reports', reportRoutes)

export default app
