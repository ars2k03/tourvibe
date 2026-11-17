import { Router } from "express";
import {
  createReview,
  deleteReview,
  getTourReviews,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/tour/:tourId", getTourReviews);
router.post("/", protect, createReview);
router.delete("/:id", protect, deleteReview);

export default router;
