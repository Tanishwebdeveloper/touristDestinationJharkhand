import express from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderStats
} from "../controllers/order.js";
import AuthorizationMiddleware from "../middleware/Authorizationmiddleware.js";

const router = express.Router();
const auth = new AuthorizationMiddleware();

// All routes require authentication
router.use(auth.authmiddleware, auth.authorizemiddleware);

router.get("/", getAllOrders);
router.get("/stats", getOrderStats);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;