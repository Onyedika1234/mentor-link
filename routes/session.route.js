import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  getSessions,
  createSession,
  rateSession,
} from "../controller/session.controller.js";
import { validateRating } from "../middleware/validate.middleware.js";
const sessionRouter = express.Router();

sessionRouter.get("/", authorize, getSessions);

sessionRouter.post("/", authorize, createSession);

sessionRouter.patch("/:id", authorize, validateRating, rateSession);

export default sessionRouter;
