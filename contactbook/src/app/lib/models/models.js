import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
  },
  {
    timestamps: true,
  }
);

// Ensure the model is only created once
const userDetail = mongoose.models.user || mongoose.model("user", userSchema);

export default userDetail;
