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

export default app
