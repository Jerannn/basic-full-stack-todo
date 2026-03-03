import express from "express";
import { protect } from "../controllers/auth.controller.js";
import { createTask } from "../controllers/task.controller.js";

const router = express.Router();

router.route("/").post(protect, createTask);

export default router;
