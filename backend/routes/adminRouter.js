import { Router } from "express";

import { userMiddleware } from "../helpers/userMiddleware.js";
import createUser from "../controllers/adminController.js";
const adminRouter = Router();

adminRouter.get("/test", (req, res) => {
  res.send("Admin Dashboard");
});

adminRouter.post("/create-user", userMiddleware, createUser);

export default adminRouter;
