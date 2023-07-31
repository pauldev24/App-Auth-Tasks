import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import taskrouter from './routes/task.routes.js'
import cors from 'cors'

const app = express()

app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use("/api", authRoutes)//Aca llamo a las rutas
app.use("/api", taskrouter)

export default app