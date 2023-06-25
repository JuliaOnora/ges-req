import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { EventDto } from "../domain/dtos/event";

import { CreateEventUseCase } from "../useCases/event/createEvent";
import { ListEventsUseCase } from "../useCases/event/listEvents";
import { GetEventUseCase } from "../useCases/event/getEvent";
import { UpdateEventUseCase } from "../useCases/event/updateEvent"; 

const prisma = new PrismaClient();

export async function listEvents (req: Request, res: Response) {
    const useCase = new ListEventsUseCase();
    const listEvent = await useCase.handle();


    return res.status(200).json(listEvent);
};


interface GetParams{
    eventId: string
};

export async function getEvent (req: Request<GetParams>, res: Response) {
	const { eventId } = req.params;

    const useCase = new GetEventUseCase();
    const event = await useCase.handle(eventId);


    if (!event){
        return res.status(404).json({
            message: "Event not found"});
    }
    

    return res.status(200).json(event);
};



export async function createEvent (req: Request <{}, {}, EventDto>, res: Response) {
    const event = req.body;

    if (!event.userId){
        return res.status(400).json({
            message: "Invalid blanks"});
    }

    const useCase = new CreateEventUseCase();
    const createdEvent = await useCase.handle(event);

    return res.status(201).json(createdEvent);
};


interface PutParams{
    eventId: string
};

export async function updateEvent (req: Request <PutParams, {}, Omit<Omit<Omit<EventDto, "id">, "projectId">, "option">>, res: Response) {
    const { eventId } = req.params;
    const eventData = req.body;

    const idEventUseCase = new GetEventUseCase();
    const getEvent = await idEventUseCase.handle(eventId);



    if (!getEvent){
        return res.status(404).json({
            message: "User not Found to update!"});
    };

    // Permite atualização somente do valor e da descrição
    const useCase = new UpdateEventUseCase();
    const updatedEvent = await useCase.handle({
        id: eventId, 
        userId: eventData.userId,
        status: eventData.status
    });

    return res.status(200).json(updatedEvent);
};
