import express from "express";
import {
  validateLogin,
  validateSignup,
} from "../middleware/validate.middleware.js";
import { login, register } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", validateSignup, register);
authRouter.post("/login", validateLogin, login);

export default authRouter;
