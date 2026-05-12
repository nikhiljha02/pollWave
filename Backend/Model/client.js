import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    login: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

const Client = mongoose.model("pollClient", clientSchema);

export default Client;
