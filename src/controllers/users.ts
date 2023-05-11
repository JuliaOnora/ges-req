import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { UserDto } from "../domain/dtos/user";


import { CreateUserUseCase } from "../useCases/user/createUser";
import { ListUsersUseCase } from "../useCases/user/listUsers";
import { GetUserUseCase } from "../useCases/user/getUser";
import { UpdateUserUseCase } from "../useCases/user/updateUsers";
import { DeleteUserUseCase } from "../useCases/user/deleteUser";


const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const prisma = new PrismaClient();

export async function listUsers(req: Request, res: Response) {
    const useCase = new ListUsersUseCase();
    const listUsers = await useCase.handle();

    return res.status(200).json(listUsers);
};


interface GetParams{
    id: string
};

export async function getUser (req: Request<GetParams>, res: Response){
	const { id } = req.params;

    const useCase = new GetUserUseCase();
    const getUser = await useCase.handle(id);

    if (!getUser){
        return res.status(404).json({
            message: "User not found"});
    }
    
    return res.status(200).json(getUser);
};


export async function createUser (req: Request <{}, {}, Omit<UserDto, "id">>, res: Response) {
	const user = req.body;

    if (!user.name){
        return res.status(400).json({
            field: "name",
            message: "Invalid name"
        })
    }

    while (!user.email || !emailRegex.test(user.email)){
        return res.status(400).json({
            field: 'email',
            message: "Invalid email"});
    };

    if (!user.password){
        return res.status(400).json({
            field: "password",
            message: "Invalid password"
        })
    }

    const useCase = new CreateUserUseCase();
    const createdUser = await useCase.handle(user);

    return res.status(201).json(createdUser);
};


interface PutParams{
    id: string
};

export async function updateUser (req: Request <PutParams, {}, Omit<UserDto, "id">>, res: Response) {
    const { id } = req.params;
    const userData = req.body;

    const idUserUseCase = new GetUserUseCase();
    const getUser = await idUserUseCase.handle(id);


    if (!getUser){
        return res.status(404).json({
            message: "User not Found to update!"});
    };

    // Permite atualização somente do valor e da descrição
    const useCase = new UpdateUserUseCase();
    const updatedUser = await useCase.handle({id, 
        name: userData.name, 
        email: userData.email});

    return res.status(200).json(updatedUser);
};

interface DeleteParams{
    id: string
}
 
export async function deleteUser (req: Request<DeleteParams>, res: Response) {
    const { id } = req.params;
    const userIndex = await prisma.user.findFirst({ // Nessa linha, referenciamos a tabela //// PRISMA
        where: {
            id: {
                equals: String(id)
            }
        }
    })

    // const errors = vr.validationResults(req);
    // if (!errors.isEmpty()){
    //         return res.status(400).json({errors: errors.array()});
    // }
    
    if (!userIndex){ // undefined é falsy
        return res.status(404).json({
            message: "User not found to delete"
        });
    }

    const useCase = new DeleteUserUseCase();
    await useCase.handle(id);

    return res.status(204).json({
        message: "User deleted successfully"
    });
};
// function validationResults(req: Request<{}, {}, ProductsDto, import("qs").ParsedQs, Record<string, any>>) {
//     throw new Error("Function not implemented.");
// }

