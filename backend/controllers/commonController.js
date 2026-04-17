import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

const login = async (req, res) => {
  const { email, password ,role} = req.body;

  console.log("Login attempt:", { email, role }); // Debug log

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
        if (user.role !== role) { 
            return res.status(403).json({
                message: "Role mismatch",
            });
         }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      JWT_USER_PASSWORD,
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
};

export default login;
