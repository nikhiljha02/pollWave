import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

clientSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

clientSchema.methods.comparePassword = function (passInput) {
  return bcrypt.compare(passInput, this.password);
};

const Client = mongoose.model("pollClient", clientSchema);
export default Client;
