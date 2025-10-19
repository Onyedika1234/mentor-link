import prisma from "../utils/prisma.js";
export const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  next();
};

export const validateMentorProfile = (req, res, next) => {
  const { expertise, bio } = req.body;

  if (!expertise || !bio)
    return res
      .status(400)
      .json({ success: false, message: "All inputs must be filled" });

  next();
};

export const validateEditMentorProfile = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const mentor = await prisma.mentor.findUnique({ where: { id } });
    if (!mentor)
      res
        .status(404)
        .json({ success: false, message: "Mentor profile not found" });

    if (user.role !== "MENTOR" || user.mentorId !== mentor.id)
      return res
        .status(403)
        .json({ success: false, message: "You are unable to make the action" });

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Error validating" });
  }
};

export const validateSessionCreation = (req, res, next) => {
  const { scheduledAt } = req.body;

  if (!scheduledAt)
    return res
      .status(400)
      .json({ success: false, message: "Scheduled date and time is required" });
};
