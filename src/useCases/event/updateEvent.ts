import { PrismaClient, Event } from "@prisma/client";

import { EventDto } from "../../domain/dtos/event";

const prisma = new PrismaClient();

export class UpdateEventUseCase{
    constructor() {}

    async handle(event: Omit<Omit<EventDto, "projectId">, "option">): Promise<Event>{

        const upEvent = await prisma.event.update({
            data: {
                userId: event.userId,
                status: event.status
            }, where: {
                id: event.id
            }
        })

        return upEvent;
    }
}