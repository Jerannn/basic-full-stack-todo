import express from "express";

// THESE ROUTER IS TO FOLLOW
const router = express.Router();

router.post("/signup", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Signup successful",
  });
});

export default router;
