import { PrismaClient, Event } from "@prisma/client";

const prisma = new PrismaClient();

export class ListEventsUseCase{
    constructor() {}

    async handle(): Promise<Event[]>{
        const listEvents = await prisma.event.findMany();

        return listEvents;
    }
}