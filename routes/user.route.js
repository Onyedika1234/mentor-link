import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import prisma from "../utils/prisma.js";

const userRoute = express.Router();

userRoute.get("/", authorize, async (req, res) => {
  const user = req.user;

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  res.status(200).json({ success: true, user });
});

export default userRoute;
