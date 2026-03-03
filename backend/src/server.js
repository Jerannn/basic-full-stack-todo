import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ENV } from "./config/env.js";

// Error controller
import globalErrorHandler from "./controllers/error.controller.js";
import AppError from "./utils/appError.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config({ quiet: true });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
app.use(
  cors({
    origin: ENV.FRONTEND_ORIGIN_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
