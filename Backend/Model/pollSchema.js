import mongoose from "mongoose";

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: [
      {
        text: {
          type: String,
        },
        vote: {
          type: Number,
          default: 0,
        },
      },
    ],

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const pollQuestionSChema = mongoose.model("pollSchema", pollSchema);
export default pollQuestionSChema;
