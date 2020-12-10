import { Router } from "express";
import {
  userAuthentication,
  authenticatedUser,
} from "../controllers/authController.js";
import { check } from "express-validator";
import auth from "../middlewares/auth.js";

//binding router
const router = Router();

// login
//api/auth
router.post(
  "/",
  [
    check("email", "Email should be formated properly.").isEmail(),
    check("email", "Email is required.").not().isEmpty(),
    // check("password", "Password most be at least 6 caracters.").isLength({
    //   min: 6,
    // }),
  ],
  userAuthentication
);

router.get("/", auth, authenticatedUser);

export default router;
