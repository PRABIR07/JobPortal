import { timeStamp } from "console";
import mongoose, { Document } from "mongoose";
import validator from "validator";

interface User extends Document {
  FirstName: string;
  LastName: string;
  Email: string;
  password: string;
  location: string;
  timeStamps: string;
}

const UserSchema = new mongoose.Schema<User>(
  {
    FirstName: {
      type: String,
      required: [true, "FirstName is required"],
    },
    LastName: {
      type: String,
    },
    Email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    location: {
      type: String,
      default: "India",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("User", UserSchema);
