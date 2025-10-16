import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { createProfile, getProfile } from "../controller/mentor.controller.js";
import { validateMentorProfile } from "../middleware/validate.middleware.js";

const mentorRouter = express.Router();

mentorRouter.post(
  "/createProfile",
  authorize,
  validateMentorProfile,
  createProfile
);

mentorRouter.get("/:id", authorize, getProfile);

export default mentorRouter;
