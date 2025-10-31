import prisma from "../utils/prisma.js";

export const getSessions = async (req, res) => {
  try {
    const session = await prisma.session.findMany();
    res.status(200).json({ success: true, session });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching sessions" });
  }
};

export const createSession = async (req, res) => {
  const user = req.user;
  const { title, description, date, time, duration } = req.body;

  try {
    if (user.role !== "MENTOR")
      return res.status(403).json({
        success: false,
        message: "Only mentors can create sessions",
      });

    const session = await prisma.session.create({
      data: {
        title,
        description,
        date,
        time,
        duration,
        mentorId: user.mentorId,
        studentId: "eaaf3f26-fe95-47a0-acef-05054a93ee69",
        status: "PENDING",
      },
    });

    res.status(201).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating session" });
    console.error(error.message);
  }
};

export const rateSession = async (req, res) => {
  const { rating } = req.rating;
  const { id } = req.params;

  if (!id)
    return res
      .status(400)
      .json({ success: false, message: "ID of session is required" });

  try {
    const session = await prisma.session.findUnique({ where: id });

    if (!session)
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });

    const newRating = ((session.rating + rating) / 2).toFixed(1);

    const updatedSession = await prisma.session.update({
      where: { id },
      data: { rating: newRating },
    });

    res.status(200).json({ success: true, updatedSession });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error rating session" });
  }
};
