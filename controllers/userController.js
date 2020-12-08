import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  //check for error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    //validate unique user
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "User already exist!" });
    }

    //create user
    user = new User(req.body);

    // hash pass
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //save user to db
    await user.save();

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
  }
};
