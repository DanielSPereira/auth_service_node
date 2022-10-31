import { inject, injectable } from 'tsyringe'
import { JwtActions } from '@/utils/JwtActions'
import { IUsersRepository } from '@/modules/accounts/repositories/IUsersRepository'

// --------------------------------------------------------------------------

@injectable()
export class GetUserInfoUseCase {
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

    async execute(token: string) {
        const parsedToken = JwtActions.parseToken(token)

        const user = await this.usersRepository.findByID(parsedToken.userID)

        return user
    }
}