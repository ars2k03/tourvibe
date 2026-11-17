import { Router } from "express";
import {
  cancelMyBooking,
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

router.use(protect);
router.post("/", createBooking);
router.get("/mine", getMyBookings);
router.patch("/:id/cancel", cancelMyBooking);
router.get("/", authorize("admin"), getAllBookings);
router.patch("/:id/status", authorize("admin"), updateBookingStatus);

export default router;
