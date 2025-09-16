import express from "express";
import { 
    getAllResorts, 
    updateResort, 
    deleteResort,
     createResort 
    } from "../controllers/resort.js";

const router = express.Router();

router.get("/", getAllResorts);
router.post("/", createResort);
router.put("/:id", updateResort);
router.delete("/:id", deleteResort);

export default router;