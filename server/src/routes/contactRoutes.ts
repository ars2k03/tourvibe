import { Router } from "express";
import {
  createContact,
  getContacts,
  updateContactStatus,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = Router();

router.post("/", createContact);
router.get("/", protect, authorize("admin"), getContacts);
router.patch("/:id", protect, authorize("admin"), updateContactStatus);

export default router;
