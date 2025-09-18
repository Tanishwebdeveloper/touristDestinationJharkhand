import express from "express";
import { getOrCreateCart, addToCart, removeFromCart, clearCart } from "../controllers/cart.js";
import AuthorizationMiddleware from "../middleware/Authorizationmiddleware.js";

const router = express.Router();
const auth = new AuthorizationMiddleware();

router.get("/", auth.authmiddleware, auth.authorizemiddleware, getOrCreateCart);
router.post("/add", auth.authmiddleware, auth.authorizemiddleware, addToCart);
router.post("/remove", auth.authmiddleware, auth.authorizemiddleware, removeFromCart);
router.post("/clear", auth.authmiddleware, auth.authorizemiddleware, clearCart);

export default router;