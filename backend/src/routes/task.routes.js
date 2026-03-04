import express from "express";
import { protect } from "../controllers/auth.controller.js";
import {
  createTask,
  getTodayTasks,
  getTomorrowTasks,
  getWeekTasks,
} from "../controllers/task.controller.js";

const router = express.Router();

router.route("/").post(protect, createTask);

router.get("/today", protect, getTodayTasks);
router.get("/tomorrow", protect, getTomorrowTasks);
router.get("/week", protect, getWeekTasks);

export default router;
