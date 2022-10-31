import { User } from '@prisma/client';

//----------------------------------------

export interface ICreateUserDTO {
    email: string;
    password: string;
}

export interface IUsersRepository {
    findByEmail(email: string): Promise<User | null>

    findByID(id: string): Promise<Omit<User, "password"> | null>

    create({ email, password }: ICreateUserDTO): Promise<void>
}
