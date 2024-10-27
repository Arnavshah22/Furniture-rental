import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { userAuthMiddleware } from "../middleware/userAuthMiddleware.js";
const router=Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route('/logout').post(userAuthMiddleware,logoutUser);



export default router;

