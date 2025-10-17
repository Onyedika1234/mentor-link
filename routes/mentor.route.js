import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
// import prisma from "../utils/prisma.js";
import {
  createProfile,
  getProfile,
  getAllMentors,
  updateMentorAccount,
} from "../controller/mentor.controller.js";
import {
  validateEditMentorProfile,
  validateMentorProfile,
} from "../middleware/validate.middleware.js";

const mentorRouter = express.Router();

// Get a mentor profile
mentorRouter.get("/:id", authorize, getProfile);

// Get all mentors
mentorRouter.get("/", authorize, getAllMentors);

// Create profile
mentorRouter.post(
  "/createProfile",
  authorize,
  validateMentorProfile,
  createProfile
);

// Update mentor profile
mentorRouter.patch(
  "/:id",
  authorize,
  validateEditMentorProfile,
  validateMentorProfile,
  updateMentorAccount
);

export default mentorRouter;
