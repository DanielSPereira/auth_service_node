import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { GetUserInfoUseCase } from './GetUserInfoUseCase';

export class GetUserInfoController {
    async handle(request: Request, response: Response) {
        const token = request.headers["authorization"]?.split(" ")[1]!

        const getUserInfo = container.resolve(GetUserInfoUseCase)

        const user = await getUserInfo.execute(token)

        response.status(200).json(user)
    }
}
