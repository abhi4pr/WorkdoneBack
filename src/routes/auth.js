import express from "express";
import {
  signup,
  login,
  forgotPassword,
  verifyEmail,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify_email", verifyEmail);
router.post("/login", login);
router.post("/forget_password", forgotPassword);
router.post("/reset_password", resetPassword);

export default router;
