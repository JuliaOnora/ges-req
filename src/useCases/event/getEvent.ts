import { PrismaClient, Event, Projects } from "@prisma/client";

const prisma = new PrismaClient();

export class GetEventUseCase{
    constructor() {}

    async handle(eventId: string): Promise<(Event&{project: Projects})[]> {
        const event = await prisma.event.findMany({
            where: {
                id: {
                    equals: eventId
                }
            }, include: {
                project: true
            }
        })

        return event;
    }
    
    }