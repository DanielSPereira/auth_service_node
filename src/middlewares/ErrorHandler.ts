import { AppError } from '../errors/AppError'
import { NextFunction, Request, Response } from 'express'

export const ErrorHandler = (err: Error, _: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    } 
    
    return response.status(500).json({
        status: 'error',
        message: `Internal server error - ${err.message}`
    })
}
