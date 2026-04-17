import express from "express";
const userRouter = express.Router();  
// import login from "../controllers/commonController.js"; 
import { userMiddleware } from "../helpers/userMiddleware.js";
import userController from "../controllers/userController.js";

userRouter.get("/profile", userMiddleware, userController.getMyProfile);

userRouter.put("/profile", userMiddleware, userController.updateMyProfile);

export default userRouter;