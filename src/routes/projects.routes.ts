import { Router } from "express";

import { listProjects, getProject, createProject, 
        updateProject, deleteProject} from "../controllers/projects";

// import { newProduct, validIdProduct, upProduct } from "../validator/productValid"

const productRoutes = Router();

productRoutes.get("/", listProjects);
productRoutes.get("/:id", getProject);
productRoutes.post("/", createProject);
productRoutes.put("/", updateProject);
productRoutes.delete("/", deleteProject);
// productRoutes.post("/", newProduct, createProduct);
// productRoutes.put("/", upProduct, updateProducts);
// productRoutes.delete("/", validIdProduct, deleteProduct);

export default productRoutes;
