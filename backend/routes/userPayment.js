import express from "express";
import UserPaymentController from "../controllers/userPayment.js";
const userPaymentController =new UserPaymentController();
const router = express.Router();

router.post("/createuserpayment", userPaymentController.collectuserdetails);
router.get(
  "/senduserpaymentemail/:email",
  userPaymentController.notificationsendafterpaymentcompletion
);

export default router;