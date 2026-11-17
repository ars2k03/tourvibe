import { Router } from "express";
import {
  getAdminDashboard,
  getPublicStats,
  getUserDashboard,
  getUsers,
  updateUserRole,
} from "../controllers/dashboardController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/stats", getPublicStats);
router.get("/me", protect, getUserDashboard);
router.get("/admin", protect, authorize("admin"), getAdminDashboard);
router.get("/users", protect, authorize("admin"), getUsers);
router.patch("/users/:id/role", protect, authorize("admin"), updateUserRole);

export default router;
