// routes/auth.route.js
import express from "express";
import { SendOtp, VerifyOtp } from "../controllers/AuthController.js";

const router = express.Router();
router.post("/send-otp", SendOtp);
router.post("/verify-otp", VerifyOtp);

router.get("/", (req, res) => {
  res.json({ success: true, message: "Auth API is working fine" });
});

export default router;
