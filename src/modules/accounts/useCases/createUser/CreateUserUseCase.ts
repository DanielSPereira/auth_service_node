import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { JwtActions } from '../../../../utils/JwtActions'
import { AppError } from '../../../../errors/AppError'
import { ICreateUserDTO, IUsersRepository } from '../../repositories/IUsersRepository'

// --------------------------------------------------------------------------

@injectable()
export class CreateUserUseCase {
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

    async execute({ email, password }: ICreateUserDTO) {
        // verify if user already exists
        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if (userAlreadyExists) {
            throw new AppError("User already exists", 409)
        }
        // encrypt password
        const encryptedPass = bcrypt.hashSync(password, 10)

        // create user
        await this.usersRepository.create({ email, password: encryptedPass })
    }
}