import { Router } from "express";
import * as controller from "../services/service.js";

const router = Router();

router.post("/ip", controller.ipConfig);

export default router;
