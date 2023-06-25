import { PrismaClient, Event } from "@prisma/client";
import { ulid } from "ulid";

import { EventDto } from "../../domain/dtos/event";

const prisma = new PrismaClient();

export class CreateEventUseCase{
    constructor() {}

    async handle(event: EventDto): Promise<Event>{
        const createdEvent = await prisma.event.create({
            data: {
                id: ulid(),
                userId: event.userId,
                projectId: event.projectId,
                option: event.option,
                status: event.status,
                neweventdate: String(new Date),
                upeventdate: String(new Date)
            },
        });

        return createdEvent;
    }
}