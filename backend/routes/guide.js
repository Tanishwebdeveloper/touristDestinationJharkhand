import express from "express";
import { 
  getAllGuides,
  createGuide,
  updateGuide,
  deleteGuide
} from "../controllers/guide.js";

const router = express.Router();

router.get("/", getAllGuides);
router.post("/", createGuide);
router.put("/:id", updateGuide);
router.delete("/:id", deleteGuide)

export default router;