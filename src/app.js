import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";
import { notFoundMiddleware, errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(
  cors({
    origin: env.clientUrl,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;