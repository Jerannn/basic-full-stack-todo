import express from "express";
import {
  checkAuth,
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
router.get("/check-auth", protect, checkAuth);
export default router;
