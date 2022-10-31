import { User } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
    async findByEmail(email: string) {
        const user = await prisma.user.findFirst({ 
            where: { email },
        })

        return user
    }

    async findByID(id: string) {
        const user = await prisma.user.findFirst({ 
            where: { id },
            select: {
                id: true,
                email: true,
                created_at: true,
                updated_at: true,
            }
        })

        return user
    }

    async create({ email, password }: ICreateUserDTO) {
        const user = await prisma.user.create({
            data: { email, password },
            select: {
                id: true,
                email: true,
                created_at: true,
                updated_at: true,
            }
        })
        
        return user
    } 
}
