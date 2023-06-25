import { PrismaClient, Projects } from "@prisma/client"; //// PRISMA
import { ulid } from "ulid";

import { ProjectsDto } from "../../domain/dtos/projects";

const prisma = new PrismaClient();

export class CreateProjectUseCase{
    constructor() {}

    async handle(project: Omit<ProjectsDto, "id">): Promise<Projects>{ //// PRISMA
        const createdProject = await prisma.projects.create({ //// PRISMA
            data: {
                id: ulid(),
                name: project.name,
                members: project.members,
                description: project.description,
                status: project.status
            },
        });

        return createdProject;
    }
}