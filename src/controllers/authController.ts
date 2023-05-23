import { RequestHandler } from "express";
import userModel from "../models/userModel";

export const registerController: RequestHandler = async (req, res, next) => {
  try {
    const { FirstName, Email, password } = req.body;

    if (!FirstName) {
      // return res.status(201).send({
      //   message: "FirstName is required",
      //   success: false,
      // });

      next("Firstname is required");
    }

    if (!Email) {
      // return res.status(201).send({
      //   message: "Email is required",
      //   success: false,
      // });
      next("Email is required");
    }

    if (!password) {
      // return res.status(201).send({
      //   message: "Password is required",
      //   success: false,
      // });
      next("Password is required");
    }

    const existingUser = await userModel.findOne({ Email });

    if (existingUser) {
      // return res.status(200).send({
      //   message: "User already exists",
      //   success: false,
      // });
      next("User already exists");
    }

    const user = await userModel.create({ FirstName, Email, password });

    //token
    const token = await user.generateAuthToken();
    console.log("token --", token);
    res.status(201).send({
      message: "User created successfully",
      success: true,
      user: {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    // console.log(error);
    // res.status(400).send({
    //   message: "Error in auth controller",
    //   success: false,
    //   error,
    // });
    next(error);
  }
};

export const loginController: RequestHandler = async (req, res, next) => {
  try {
    const { Email, password } = req.body;
    //validation
    if (!Email || !password) {
      next("Please provide all the details");
    }

    //find user by email
    const user = await userModel.findOne({ Email });
    if (!Email) {
      next("Invalid UserName and Password");
    }
  } catch (error) {
    console.log(error);
  }
};
