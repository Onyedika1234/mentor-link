import express from "express";
import {
  validateLogin,
  validateSignup,
} from "../middleware/validate.middleware.js";
import { login, register } from "../controller/auth.controller.js";
import { authLimit } from "../utils/ratelimit.js";

const authRouter = express.Router();

authRouter.post("/register", authLimit, validateSignup, register);
authRouter.post("/login", authLimit, validateLogin, login);

export default authRouter;
