import express from "express";
import { Login, Register } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/register", (req, res) => {
  res.json({ success: true, message: "Register endpoint is alive ✅" });
});

export default router;
