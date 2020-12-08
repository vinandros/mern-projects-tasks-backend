import { Router } from "express";
import { userAuthentication } from "../controllers/authController.js";
import { check } from "express-validator";

//binding router
const router = Router();

//api/auth
router.post(
  "/",
  [
    check("email", "Email should be formated properly.").isEmail(),
    check("email", "Email is required.").not().isEmpty(),
    check("password", "Password most be at least 6 caracters.").isLength({
      min: 6,
    }),
  ],
  userAuthentication
);

export default router;
