import { Router } from "express";
import {
  getMe,
  googleAuthCallback,
  googleAuthRedirect,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/google", googleAuthRedirect);
router.get("/google/callback", googleAuthCallback);
router.get("/me", protect, getMe);
router.patch("/profile", protect, upload.single("avatar"), updateProfile);

export default router;
