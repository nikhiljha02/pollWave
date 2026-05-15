import mongoose from "mongoose";

const pollResponse = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    voterId: {
      type: String,
      required: true,
    },
    voterIp: {
      type: String,
    },
    voterName: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const pollResponded = mongoose.model("pollResponse", pollResponse);

export default pollResponded;
