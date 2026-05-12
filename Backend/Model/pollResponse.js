import mongoose from "mongoose";
import pollQuestionSChema from "./pollSchema";

const pollResponse = new mongoose.Schema(
  {
    pollId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    voterId: {
      types: mongoose.Schema.Types.ObjectId,
    },
    voterIp: {
      type: String,
    },
    voterEmail: {
      type: String,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const pollResponded = mongoose.model("pollResponse", pollQuestionSChema);
