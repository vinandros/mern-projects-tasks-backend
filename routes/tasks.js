import { Router } from "express";
import auth from "../middlewares/auth.js";
import { check } from "express-validator";
import {
  createTask,
  getTaskFromProject,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
const router = Router();

//api/tasks
router.post(
  "/",
  auth,
  [
    check("name", "Task's name is required.").not().isEmpty(),
    check("projectId", "Project ID is required").not().isEmpty(),
  ],
  createTask
);

router.get(
  "/",
  auth,
  [check("projectId", "Project ID is required").not().isEmpty()],
  getTaskFromProject
);

router.put(
  "/:id",
  auth,
  [check("projectId", "Project ID is required").not().isEmpty()],
  updateTask
);

router.delete(
  "/:id",
  [check("projectId", "Project ID is required").not().isEmpty()],
  auth,
  deleteTask
);

export default router;
