import express from 'express';
import { handleTourismGuide } from '../controllers/tourismGuide.js';

const router = express.Router();
router.post('/', handleTourismGuide);

export default router;