import { Router } from "express";
import * as controller from "../services/Controller.js";
import RegisterDto from "../Dtos/registerDto.js";
import loginDto from "../Dtos/loginDto.js";
import validate from "../Dtos/validator.js";
import authenticate from "../Dtos/auhtMiddleware.js";

const router = Router();

router.post("/ip", controller.ipAddress);
router.post("/register", validate(RegisterDto), controller.registerController);
router.post("/login", validate(loginDto), controller.loginController);
router.post("/logout", authenticate, controller.logout);

export default router;
