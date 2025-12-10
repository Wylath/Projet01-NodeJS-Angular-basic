import { Router } from "express";
import { getProjectList, addProject } from "../controllers/project.controller.js";

const router = Router();

router.get("/getlist", getProjectList);
router.post("/add", addProject);

export default router;
