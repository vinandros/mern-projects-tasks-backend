import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const userAuthentication = async (req, res) => {
  //check for error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    //check use exist
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "User not exist" });
    }

    //check password
    const rightPassword = await bcryptjs.compare(password, user.password);
    if (!rightPassword) {
      res.status(400).json({ msg: "Incorrect password" });
    }

    //create and firm jwt
    const payload = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: "1h",
      },
      (error, token) => {
        if (error) {
          throw error;
        }
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "Something went wrong!" });
    process.exit(1);
  }
};

export const authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
