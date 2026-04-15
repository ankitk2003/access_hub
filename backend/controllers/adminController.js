
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser=async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    User.create({ username, email, password: hashedPassword, role,createdBy: req.userId, updatedBy: req.userId });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

export default createUser;
