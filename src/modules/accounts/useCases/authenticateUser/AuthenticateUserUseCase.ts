import bcrypt from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { JwtActions } from '@/utils/JwtActions'
import { AppError } from '@/errors/AppError'
import { ICreateUserDTO, IUsersRepository } from '@/modules/accounts/repositories/IUsersRepository'

// --------------------------------------------------------------------------

@injectable()
export class AuthenticateUserUseCase {
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

    async execute({ email, password }: ICreateUserDTO) {
        // verify if user exists
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('User not found', 404)
        }
        // check password
        const passwordsMatch = await bcrypt.compare(password, user.password) 

        if (!passwordsMatch) {
            throw new AppError('password not match', 401)
        }

        // generates JWT
        const signedToken = JwtActions.generateToken(user.id)

        // return user
        return {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
            tokens: {
                access: signedToken,
            }
        }
    }
}