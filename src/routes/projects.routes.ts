import { Router } from "express";

import { listProjects, getProject, createProject, 
        updateProject, deleteProject} from "../controllers/projects";

// import { newProduct, validIdProduct, upProduct } from "../validator/productValid"

const projectRoutes = Router();

projectRoutes.get("/", listProjects);
projectRoutes.get("/:id", getProject);
projectRoutes.post("/", createProject);
projectRoutes.put("/:projectId", updateProject);
projectRoutes.delete("/", deleteProject);


export default projectRoutes;
