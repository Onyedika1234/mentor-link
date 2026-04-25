import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  getUserProfile,
  getUserMentorProfile,
} from "../controller/user.controller.js";

const userRoute = express.Router();

userRoute.get("/", authorize, getUserProfile);

// get user mentors account

userRoute.get("/mentor-profile", authorize, getUserMentorProfile);
export default userRoute;
