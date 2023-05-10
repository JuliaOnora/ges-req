import { Router } from "express";

import { listEvents, getEvent, createEvent } from "../controllers/event";

const eventRoutes = Router();

eventRoutes.get("/", listEvents);
eventRoutes.get("/:userId", getEvent);
eventRoutes.post("/", createEvent);

export default eventRoutes;

