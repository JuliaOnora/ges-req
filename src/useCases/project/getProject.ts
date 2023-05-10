import { PrismaClient, Projects } from "@prisma/client";

const prisma = new PrismaClient();

export class GetProjectUseCase{
    constructor() {}

    async handle(id: string): Promise<Projects | null> { //// prisma
        const project = await prisma.projects.findFirst({ //// PRISMA
            where: {
                id: {
                    equals: id
                }
            }
        })

        return project;
    }
}