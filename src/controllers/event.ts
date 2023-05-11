import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { PurchaseDto } from "../domain/dtos/purchase";

import { CreateEventUseCase } from "../useCases/event/createEvent";
import { ListEventsUseCase } from "../useCases/event/listEvents";
import { GetEventUseCase } from "../useCases/event/getEvent";

const prisma = new PrismaClient();

export async function listEvents (req: Request, res: Response) {
    const useCase = new ListEventsUseCase();
    const listPurchase = await useCase.handle();


    return res.status(200).json(listPurchase);
};


interface GetParams{
    userId: string
};

export async function getEvent (req: Request<GetParams>, res: Response) {
	const { userId } = req.params;

    const useCase = new GetEventUseCase();
    const userPurchase = await useCase.handle(userId);


    if (!userPurchase){
        return res.status(404).json({
            message: "Purchase not found"});
    }

    let total: number = 0;

    for (let i = 0; i < userPurchase.length; i++){
        total += userPurchase[i].qty * Number(userPurchase[i].product.value
            );
    };

    const upList = JSON.parse(JSON.stringify(userPurchase));
    
    
    upList.push({"totalValue": total.toFixed(2)});

    return res.status(200).json(upList);
};



export async function createEvent (req: Request <{}, {}, PurchaseDto>, res: Response) {
    const purchase = req.body;

    if (!purchase.userId || !purchase.productId || !purchase.qty){
        return res.status(400).json({
            message: "Invalid blanks"});
    }

    const useCase = new CreateEventUseCase();
    const createdPurchase = await useCase.handle(purchase);

    return res.status(201).json(createdPurchase);
};
