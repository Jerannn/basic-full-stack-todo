import express from "express";
import {
  getMe,
  protect,
  signin,
  signup,
} from "../controllers/auth.controller.js";

// THESE ROUTER IS TO FOLLOW
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/me", protect, getMe);
export default router;
