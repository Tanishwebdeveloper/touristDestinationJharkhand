import express from "express";
import Usercontroller from "../controller/Usercontroller.js";
import AuthorizationMiddleware from "../middleware/Authorizationmiddleware.js";
const authorizemiddleware = new AuthorizationMiddleware();
const usercontroller = new Usercontroller();
const router = express.Router();

// now we shall make the routes for creating the user

router.post("/registeruser", usercontroller.registerUser);
router.post("/loginuser", usercontroller.LoginUser);

// also we are mentioning the routes for the authorization of the  user

router.get(
  "/authorizerole",
  authorizemiddleware.authmiddleware,
  authorizemiddleware.authorizemiddleware,
  usercontroller.verifyrole
);

export default router;