import { PrismaClient, User } from "@prisma/client";

import { UserDto } from "../../domain/dtos/user";

import { crypt } from "../../services/crypto";

const prisma = new PrismaClient();

export class UpdateUserUseCase{
    constructor() {}

    async handle(user: Omit<UserDto, "salt">): Promise<User>{
        const hashed = crypt(user.password);

        const upUser = await prisma.user.update({
            data: {
                name: user.name,
                email: user.email,
                role: user.role,
                password: hashed.hash,
                salt: hashed.salt
            }, where: {
                id: user.id
            }
        })

        return upUser;
    }
}