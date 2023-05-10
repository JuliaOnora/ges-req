import { PrismaClient, Projects } from "@prisma/client";

const prisma = new PrismaClient();

export class ListProjectUseCase{
    constructor() {}

    async handle(): Promise<Projects[]>{
        const listProject = await prisma.projects.findMany(); //// PRISMA

        return listProject;
    }
}