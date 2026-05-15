import { Router } from "express";
import * as controller from "../services/Controller.js";
import * as pollController from "../services/poll.Controller.js";
import RegisterDto from "../Dtos/registerDto.js";
import loginDto from "../Dtos/loginDto.js";
import validate from "../Dtos/validator.js";
import authenticate from "../Dtos/auhtMiddleware.js";
import pollSchemaDto from "../Dtos/pollSchemaDto.js";
import assignUserVoteId from "../Dtos/pollUserMiddleWare.js";
import pollResponse from "../Dtos/reg.response.js";
import pollAuthenticate from "../Dtos/pollAuthenticate.js";

const router = Router();

//Auth Modal route
router.post("/ip", controller.ipAddress);
router.post("/signup", validate(RegisterDto), controller.registerController);
router.post("/login", validate(loginDto), controller.loginController);
router.post("/logout", authenticate, controller.logout);
router.get("/me", authenticate, controller.userProfile);
router.get("/health", async (req, res) => {
  res.json({ ok: true, message: "server is good" });
});

//POll route

router.post(
  "/pollCreate",
  validate(pollSchemaDto),
  pollController.questionSubmit,
);
router.post("/pollData", pollAuthenticate, pollController.getPollData);
router.post("/vote", assignUserVoteId, pollResponse, pollController.submitVote);

export default router;
