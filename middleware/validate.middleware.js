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
