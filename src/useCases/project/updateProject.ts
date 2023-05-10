import { PrismaClient, Projects } from "@prisma/client";

import { ProjectsDto } from "../../domain/dtos/projects";

const prisma = new PrismaClient();

export class UpdateProjectUseCase{
    constructor() {}

    async handle(project: ProjectsDto): Promise<Projects>{ //// PRISMA
        const upProject = await prisma.projects.update({ //// PRISMA
            data: {
                name: project.name,
                members: project.members,
                description: project.description
            }, where: {
                id: project.id
            }
        })

        return upProject;
    }
}