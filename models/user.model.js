import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String, // stores OTP code
    },
    otpExpires: {
      type: Date, // stores OTP expiry time
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
