import express from "express";
import { validateSignup } from "../middleware/validate.middleware.js";
import { register } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", validateSignup, register);

export default authRouter;
