import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await prisma.user.findUnique({ where: { email } });

    if (userExist)
      return res
        .status(400)
        .json({ success: false, message: "Email already in use!" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    res.sendStatus(500);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found, Create account to continue",
      });

    const validatePassword = await bcrypt.hash(password, user.password);
    if (!validatePassword)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.sendStatus(500);
  }
};
