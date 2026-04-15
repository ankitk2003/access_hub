import express from "express";
const commonRouter = express.Router();  
import login from "../controllers/commonController.js";

commonRouter.post("/login", login);

export default commonRouter;
