import { Router } from "express";
import {
  createTour,
  deleteTour,
  getFeaturedTours,
  getTourById,
  getTours,
  updateTour,
} from "../controllers/tourController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", getTours);
router.get("/featured", getFeaturedTours);
router.get("/:id", getTourById);
router.post("/", protect, authorize("admin"), createTour);
router.patch("/:id", protect, authorize("admin"), updateTour);
router.delete("/:id", protect, authorize("admin"), deleteTour);

export default router;
