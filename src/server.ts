import 'reflect-metadata'
import './shared/container'
import express from 'express'
import 'express-async-errors'
import { routes } from './routes'
import { ErrorHandler } from './middlewares/ErrorHandler'

const port = process.env.PORT || 5001
const app = express()

app.use(express.json())
app.use("/api/v1", routes)
app.use(ErrorHandler)

app.listen(port) 
