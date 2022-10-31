import { AppError } from '@/errors/AppError'
import { JwtActions } from '@/utils/JwtActions'
import { NextFunction, Request, Response } from 'express'

export const JwtHandler = (request: Request, _: Response, next: NextFunction) => {
    const token = request.headers["authorization"]?.split(" ")[1]

    if (!token) throw new AppError('malformatted token', 401)

    JwtActions.parseToken(token)

    next()
}
