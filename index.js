import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use("auth", authRouter);

app.get("/", (req, res) => res.sendStatus(200));

app.listen(process.env.PORT, () => console.log("Server running"));
