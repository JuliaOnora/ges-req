import { Router } from "express";

import { listUsers, getUser, createUser, 
        updateUser, deleteUser} from "../controllers/users";

const userRoutes = Router();

userRoutes.get("/", listUsers);
userRoutes.get("/:id", getUser);
userRoutes.post("/", createUser);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;

