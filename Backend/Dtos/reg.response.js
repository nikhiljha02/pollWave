import pollResponded from "../Model/pollResponse.js";
import APiError from "../utils/api-error.js";
export default async function pollResponse(req, res, next) {
  try {
    const voterId = req.userVoterId;
    const pollId = req.body.pollId;
    const name = req.body.name;

    console.log("voterId:", voterId);

    if (!voterId) {
      throw APiError.badRequest("voterId missing");
    }

    const existingVote = await pollResponded.findOne({
      voterId,
      pollId,
    });

    if (existingVote) {
      throw APiError.forBidden("Already voted for this poll");
    }

    const newUser = await pollResponded.create({
      pollId,
      voterId,
      voterName: name,
    });

    console.log("Saved:", newUser);

    next();
  } catch (err) {
    next(err);
  }
}
