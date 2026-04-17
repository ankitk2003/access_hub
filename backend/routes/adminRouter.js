import { Router } from "express";

import { userMiddleware } from "../helpers/userMiddleware.js";
import adminController from "../controllers/adminController.js";
const adminRouter = Router();

adminRouter.get("/test", (req, res) => {
  res.send("Admin Dashboard");
});

adminRouter.post("/create-user", userMiddleware, adminController.createUser);
adminRouter.get("/users", userMiddleware, adminController.getAllUsers);
adminRouter.get("/users/:id", userMiddleware, adminController.getSingleUser);
adminRouter.put("/users/:id", userMiddleware, adminController.updateUser); // update user details
adminRouter.delete("/users/:id", userMiddleware, adminController.deleteUser);
adminRouter.post("/users/:id/update-status", userMiddleware, adminController.updateUserStatus);
// adminRouter.post("/users/:id/reset-password", userMiddleware, adminController.resetPassword);
export default adminRouter;
