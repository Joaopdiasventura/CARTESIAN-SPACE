import { config } from "dotenv";
config();

import fastify from "fastify";
import cors from "@fastify/cors";
import multer from "fastify-multer";
import User from "./routes/user";
import Achievement from "./routes/achievement";
import Point from "./routes/point";

const app = fastify({ logger: true });

const corsOptions = {
  origin: [process.env.FRONTEND],
  methods: ["GET", "DELETE", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.register(cors, corsOptions);

app.register(multer.contentParser);

app.register(User);
app.register(Achievement);
app.register(Point);

export default app;