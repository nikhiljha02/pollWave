import * as pollServices from ".//pollWave/poll.service.js";
import ApiResponse from "../utils/ApiResponse.js";

const questionSubmit = async (req, res) => {
  const data = await pollServices.pollCreate(req.body);
  ApiResponse.ok(res, "poll Created", data);
};

const getPollData = async (req, res) => {
  const data = await pollServices.pollData(req.body.id);

  ApiResponse.ok(res, "", data);
};
const submitVote = async (req, res) => {

  const data = await pollServices.pollVote(req.body);
  ApiResponse.ok(res, "vote submitted", data);
};

export { questionSubmit, getPollData, submitVote };
