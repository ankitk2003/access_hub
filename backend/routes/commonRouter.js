import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
const JWT_user_password = process.env.JWT_user_password;
const commonRouter = Router();


commonRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_user_password,
    );

    res.json({
      token: token,
      userName: user.username,
      role: user.role,
    });
  } catch (e) {
    console.log("Error during signin: " + e);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default commonRouter;
