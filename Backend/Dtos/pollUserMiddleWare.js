import { v4 as uuidv4 } from "uuid";

export default async function assignUserVoteId(req, res, next) {
  let userVoterId = req.cookies._poll_idUserId;

  if (!userVoterId) {
    userVoterId = uuidv4();
    res.cookie("_poll_idUserId", userVoterId, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  }

  req.userVoterId = userVoterId;

  next();
}
