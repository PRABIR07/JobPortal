import { timeStamp } from "console";
import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
interface User extends Document {
  FirstName: string;
  LastName: string;
  Email: string;
  password: string;
  location: string;
  timeStamps: string;
  generateAuthToken: () => string;
  comparePassword: (userPassword: string) => boolean;
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
      select: false,
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

//middlewares

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function (userPassword:string) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//generate token

UserSchema.methods.generateAuthToken = async function () {
  try {
    let token = await jwt.sign(
      { _id: this._id },
      process.env.SECRET_KEY || "sdfsdfgfdsg",
      { expiresIn: "2d" }
    );
    // this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

export default mongoose.model<User>("User", UserSchema);
