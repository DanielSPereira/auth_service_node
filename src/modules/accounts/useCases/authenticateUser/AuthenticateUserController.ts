import { container } from "tsyringe";
import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body

        const authenticateUser = container.resolve(AuthenticateUserUseCase)

        const user = await authenticateUser.execute({ email, password })

        return response.status(200).json(user)
    }
}
