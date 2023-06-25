import { PrismaClient, User } from "@prisma/client";
import { ulid } from "ulid";
import { crypt } from "../../services/crypto";

import { UserDto } from "../../domain/dtos/user";

const prisma = new PrismaClient();

export class CreateUserUseCase{
    constructor() {}

    async handle(user: Omit<Omit<UserDto, "id">, "salt">): Promise<User>{

        const hashed = crypt(user.password)

        const createdUser = await prisma.user.create({
            data: {
                id: ulid(),
                name: user.name,
                email: user.email,
                role: user.role, 
                password: hashed.hash,
                salt: hashed.salt

            },
        });

        return createdUser;
    }
}