import express from 'express';
import { handleChat } from '../controllers/RateBot.js';

const router = express.Router();

router.post('/', handleChat);

export default router;