import { Router } from "express";
import { createUser } from "../controllers/userController.js";
import { check } from "express-validator";

//binding router
const router = Router();

//api/users
router.post(
  "/",
  [
    check("userName", "User name is required.").not().notEmpty(),
    check("email", "Email should be formated properly.").isEmail(),
    check("email", "Email is required.").not().isEmpty(),
    check("password", "Password most be at least 6 caracters.").isLength({
      min: 6,
    }),
  ],
  createUser
);

export default router;
