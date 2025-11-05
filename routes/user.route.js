import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { getUserProfile } from "../controller/user.controller.js";

const userRoute = express.Router();

userRoute.get("/", authorize, getUserProfile);

export default userRoute;
