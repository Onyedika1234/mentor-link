import prisma from "../utils/prisma.js";
import { mentorProfileDto } from "../utils/dtos.js";
export const getUserProfile = async (req, res) => {
  const user = req.user;

  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  res.status(200).json({ success: true, user });
};

export const getUserMentorProfile = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id)
      return res.status(409).json({ success: false, message: "Unauthorized" });

    const mentorProfile = await prisma.mentor.findUnique({
      where: { userId: id },
      include: { user: true },
    });

    if (!mentorProfile)
      return res.status(404).json({
        success: false,
        message:
          "Mentor Profile not available, to have a mentor profile, you have to create a mentor profile",
      });

    //Redirect to the mentor creation page.

    res
      .status(200)
      .json({ success: true, mentorProfile: mentorProfileDto(mentorProfile) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error." });
  }
};
