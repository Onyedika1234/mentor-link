import prisma from "../utils/prisma.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

export const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) return res.sendStatus(401);

    req.user = user;

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};
