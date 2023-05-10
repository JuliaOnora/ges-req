import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { ProjectsDto } from "../domain/dtos/projects";

import { CreateProjectUseCase } from "../useCases/project/createProject";
import { ListProjectUseCase } from "../useCases/project/listProjects";
import { GetProjectUseCase } from "../useCases/project/getProject";
import { UpdateProjectUseCase } from "../useCases/project/updateProject";
import { DeleteProjectUseCase } from "../useCases/project/deleteProject";
// const vr = require("express-validators");


const projectsRoutes = Router();
const prisma = new PrismaClient(); //// PRISMA


export async function listProjects(req: Request, res: Response) {
    const useCase = new ListProjectUseCase();
    const listProjects = await useCase.handle();

    return res.status(200).json(listProjects);
};


interface GetParams{
    id: string
};

export async function getProject (req: Request<GetParams>, res: Response) {
	const { id } = req.params;

    const useCase = new GetProjectUseCase();
    const getProject = await useCase.handle(String(id));

    if (!getProject){
        return res.status(404).json({
            message: "Product not found"});
    }
    
    return res.status(200).json(getProject);
};


export async function createProject (req: Request <{}, {}, ProjectsDto>, res: Response){
    const project = req.body;

    // const errors = vr.validationResults(req);
    // if (!errors.isEmpty()){
    //         return res.status(400).json({errors: errors.array()});
    // }

    while (!project.name || !project.members){
        return res.status(404).json({
            field: 'name',
            message: "Invalid blanks for Product"});
    }

    const useCase = new CreateProjectUseCase();
    const createdProject = await useCase.handle(project);
    
    return res.json(createdProject);

};

interface PutParams{
    id: string
};

export async function updateProject (req: Request <PutParams, {}, Omit<ProjectsDto, "id">>, res: Response){
    const { id } = req.params;
    const projectData = req.body;


    const idProjectUseCase = new GetProjectUseCase();
    const getProject = await idProjectUseCase.handle(String(id));

    // const errors = vr.validationResults(req);
    // if (!errors.isEmpty()){
    //         return res.status(400).json({errors: errors.array()});
    // }

    if (!getProject){
        return res.status(404).json({
            message: "Product not Found to update!"});
    };

    // Permite atualização somente do valor e da descrição
    const useCase = new UpdateProjectUseCase();
    const createdProject = await useCase.handle({
        id: String(id), 
        name: projectData.name, 
        members: projectData.members, 
        description: projectData.description} );

    return res.status(200).json(createdProject);
};


interface DeleteParams{
    id: string
}
 
export async function deleteProject (req: Request<DeleteParams>, res: Response) {
    const { id } = req.params;
    const projectIndex = await prisma.projects.findFirst({ // Nessa linha, referenciamos a tabela //// PRISMA
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
    
    if (!projectIndex){ // undefined é falsy
        return res.status(404).json({
            message: "Product not found to delete"
        });
    }

    const useCase = new DeleteProjectUseCase();
    await useCase.handle(id);

    return res.json({
        message: "Product deleted successfully"
    });
};
// function validationResults(req: Request<{}, {}, ProductsDto, import("qs").ParsedQs, Record<string, any>>) {
//     throw new Error("Function not implemented.");
// }

