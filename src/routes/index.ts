import { Router } from "express";
import userRoutes from "./users.routes";
import projectRoutes from "./projects.routes";

const routes = Router();

routes.use('/projects', projectRoutes);
routes.use('/users', userRoutes);

export default routes;