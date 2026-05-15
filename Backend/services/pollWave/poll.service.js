import pollResponded from "../../Model/pollResponse.js";
import pollQuestionSChema from "../../Model/pollSchema.js";
import APiError from "../../utils/api-error.js";

const pollCreate = async ({ question, options, allowAnonymous, expiresAt }) => {
  const pollData = {
    question,
    options,
    allowAnonymous,
    expiresAt,
    isActive: true,
  };

  let pollCreate = await pollQuestionSChema.create(pollData);

  let resObject = pollCreate._id;
  return { resObject };
};

const pollData = async (pollId) => {
  let pollQ = await pollQuestionSChema.findById(pollId).select("+expiresAt");
  if (!pollQ) {
    throw APiError.notFound("This poll is not available");
  }

  if (pollQ.expiresAt < new Date()) {
    pollQ.isActive = false;
    await pollQ.save();
    return { expireStatus: true, message: "Poll has expired", data: pollQ };
  } else {
    let resObj = pollQ.toObject();
    resObj.allowAnonymous = true;
    return resObj;
  }
};

const pollVote = async ({ pollId, optionId }) => {
  let poll = await pollQuestionSChema.findById(pollId);
  if (!poll) {
    throw APiError.notFound("This poll is not available");
  }
  console.log(poll);
  if (!poll.isActive) {
    throw APiError.forBidden("Poll Expired");
  }
  const option = poll.options.id(optionId);

  if (!option) {
    throw APiError.notFound("Option not found");
  }

  option.vote += 1;
  await poll.save();
  return { message: "Vote submitted successfully" };
};

export { pollCreate, pollData, pollVote };
//start from here to write poll schema
