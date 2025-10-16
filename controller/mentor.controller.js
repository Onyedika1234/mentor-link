import prisma from "../utils/prisma.js";
export const createProfile = async (req, res) => {
  const { expertise, bio } = req.body;
  const user = req.user;

  try {
    // const mentor = await prisma.mentor.create({
    //   data: {
    //     userId: user.id,
    //     expertise,
    //     bio,
    //   },
    // });
    const [mentor, user] = await prisma.$transaction([
      prisma.mentor.create({
        data: {
          userId: user.id,
          expertise,
          bio,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { mentorId: mentor.id, role: "MENTOR" },
      }),
    ]);
    res.status(201).json({ success: true, mentor });
  } catch (error) {
    res.sendStatus(500);
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
