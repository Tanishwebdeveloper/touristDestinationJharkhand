import express from "express";
import { signupUser, loginUser, googleLogin } from "../controllers/userController.js";

const router = express.Router();

// Local signup route
router.post("/signup", signupUser);

// Local login route
router.post("/login", loginUser);

// Google login route
router.post("/google-login", googleLogin);

export default router;