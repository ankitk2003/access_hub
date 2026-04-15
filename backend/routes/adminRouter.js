import { Router } from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../helpers/userMiddleware.js";
const adminRouter = Router();

adminRouter.get("/test", (req, res) => {
  res.send("Admin Dashboard");
});

adminRouter.post("/create-user",userMiddleware, (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    User.create({ username, email, password: hashedPassword, role,createdBy: req.userId, updatedBy: req.userId });
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});



adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(403).json({
        message: "Incorrect credentials",
      });
    }
    //@ts-ignore
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
      JWT_user_password
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


export default adminRouter;
