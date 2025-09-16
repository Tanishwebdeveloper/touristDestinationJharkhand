import express from "express";
import { 
  getAllDrivers, 
  createDriver, 
  updateDriver, 
  deleteDriver 
} from "../controllers/driver.js";

const router = express.Router();

router.get("/", getAllDrivers);
router.post("/", createDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);

export default router;