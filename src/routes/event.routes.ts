import { Router } from "express";

import { listEvents, getEvent, createEvent, updateEvent } from "../controllers/event";

const eventRoutes = Router();

eventRoutes.get("/", listEvents);
eventRoutes.get("/:eventId", getEvent);
eventRoutes.post("/", createEvent);
eventRoutes.put("/:eventId", updateEvent);

export default eventRoutes;

