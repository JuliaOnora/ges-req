import { Router } from "express";
import userRoutes from "./users.routes";
import projectRoutes from "./projects.routes";
import eventRoutes from "./event.routes";

const routes = Router();

routes.use('/projects', projectRoutes);
routes.use('/users', userRoutes);
routes.use('/events', eventRoutes);

export default routes;