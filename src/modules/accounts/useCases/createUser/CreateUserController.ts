import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body

        const createUser = container.resolve(CreateUserUseCase)

        const user = await createUser.execute({ email, password })

        response.status(201).json(user)
    }
}
