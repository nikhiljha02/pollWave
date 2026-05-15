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

    allowAnonymous: {
      type: Boolean,
      default: false,
    },

    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: false,
      select: false,
    },
    expiresAt: {
      type: Date,
      select: false,
    },
  },
  { timestamps: true },
);

const pollQuestionSChema = mongoose.model("pollSchema", pollSchema);
export default pollQuestionSChema;
