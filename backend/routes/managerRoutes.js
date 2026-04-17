import express from "express";
const managerRouter = express.Router();
import managerController from "../controllers/managerController.js";
import { userMiddleware } from "../helpers/userMiddleware.js";
import { managerMiddleware } from "../helpers/managerMiddleware.js";

managerRouter.get(
  "/users",
  userMiddleware,
  managerMiddleware,
  managerController.getManagerUsers,
);

managerRouter.put(
  "/users/:id",
  userMiddleware,
  managerMiddleware,
  managerController.updateManagerUser,
);

export default managerRouter;
