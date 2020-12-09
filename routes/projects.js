import { Router } from "express";
import {
  createProject,
  getProjectsForActiveUser,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { check } from "express-validator";
import auth from "../middlewares/auth.js";

const router = Router();

//api/projects
router.post(
  "/",
  auth,
  [check("name", "Project name is required.").not().isEmpty()],
  createProject
);

router.get("/", auth, getProjectsForActiveUser);

router.put(
  "/:id",
  auth,
  [check("name", "Project name is required.").not().isEmpty()],
  updateProject
);

router.get("/", auth, getProjectsForActiveUser);

router.delete("/:id", auth, deleteProject);

export default router;
