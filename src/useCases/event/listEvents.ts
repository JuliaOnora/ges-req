import { PrismaClient, Purchase } from "@prisma/client";

const prisma = new PrismaClient();

export class ListEventsUseCase{
    constructor() {}

    async handle(): Promise<Purchase[]>{
        const listPurchase = await prisma.purchase.findMany();

        return listPurchase;
    }
}