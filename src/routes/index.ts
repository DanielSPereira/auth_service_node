import { Router } from 'express'
import { usersRoutes } from '../routes/users.routes'

const routes = Router()

routes.use("/auth", usersRoutes)

export { routes }