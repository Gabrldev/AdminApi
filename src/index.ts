import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { router } from './routes'
import db from './config/db'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

const app = express()

const PORT = process.env.PORT ?? 4001

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(router)

void db().then(() => console.log('Database connected'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
