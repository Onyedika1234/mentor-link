import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import mentorRouter from "./routes/mentor.route.js";
import userRoute from "./routes/user.route.js";
import sessionRouter from "./routes/session.route.js";
import { globalLimit } from "./utils/ratelimit.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(globalLimit);

app.use("/auth", authRouter);

app.use("/mentors", mentorRouter);

app.use("/user", userRoute);

app.use("/sessions", sessionRouter);

app.get("/", (req, res) => res.sendStatus(200));

app.listen(process.env.PORT, () => console.log("Server running"));
