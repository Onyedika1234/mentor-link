import prisma from "../utils/prisma.js";
export const createProfile = async (req, res) => {
  const { expertise, bio } = req.body;
  const user = req.user;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const mentor = await tx.mentor.create({
        data: {
          userId: user.id,
          expertise,
          bio,
        },
      });
      const updatedUser = await tx.user.update({
        where: { id: user.id },
        data: { mentorId: mentor.id, role: "MENTOR" },
      });

      return { mentor, updatedUser };
    });

    res.status(201).json({ success: true, mentor: result.mentor });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error creating mentor profile" });
  }
};

export const getProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await prisma.mentor.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!profile)
      res.status(404).json({ success: false, message: "Profile not found" });

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getAllMentors = async (req, res) => {
  try {
    const mentors = await prisma.mentor.findMany();
    res.status(200).json({ success: true, mentors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching mentors" });
  }
};

export const updateMentorAccount = async (req, res) => {
  const { id } = req.params;
  const { expertise, bio } = req.body;
  try {
    const updatedMentor = await prisma.mentor.update({
      where: { id },
      data: { expertise, bio },
    });

    res.status(200).json({ success: true, updatedMentor });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating mentor profile" });
  }
};
