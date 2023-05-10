import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DeleteProjectUseCase{
    constructor() {}

    async handle(id: string) {
        await prisma.projects.delete({ //// PRISMA
            where: {
                id: String(id)
            }
        })

    }
}