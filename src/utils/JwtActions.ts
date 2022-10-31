import { AppError } from '../errors/AppError'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

//------------------------------------------

export interface JWTClaims extends JwtPayload {
    userID: string;
}

export class JwtActions {
    public static generateToken(userID: string): string {
        const privateKey: Secret = process.env.ACCESS_TOKEN_KEY!
        const expiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRATION_SECONDS!)

        const signedToken = jwt.sign({ userID }, privateKey, { expiresIn })

        return signedToken
    }

    public static parseToken(token: string): JWTClaims {
        try {
            const privateKey: Secret = process.env.ACCESS_TOKEN_KEY!
            const claims = jwt.verify(token, privateKey)

            return claims as JWTClaims 
            
        } catch (err) {
            const errorMsg = (err as { message: string })?.message

            if (errorMsg === 'jwt expired') throw new AppError(errorMsg, 401)

            throw new Error(errorMsg)
        }
    }
}