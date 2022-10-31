import { Router } from 'express'
import { JwtHandler } from '../middlewares/JwtHandler'
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController'
import { GetUserInfoController } from '../modules/accounts/useCases/getUserInfoUseCase/GetUserInfoController'
import { AuthenticateUserController } from '../modules/accounts/useCases/authenticateUser/AuthenticateUserController'

const getUserInfoController = new GetUserInfoController()
const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

const usersRoutes = Router()

// private routes
usersRoutes.get("/current", JwtHandler, getUserInfoController.handle)

// public routes
usersRoutes.post("/sign/up", createUserController.handle)
usersRoutes.get("/sign/in", authenticateUserController.handle)

export { usersRoutes }