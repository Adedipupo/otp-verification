import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";
import twilio from "twilio";
import randomize from "randomatic";

// Generate a random OTP
const generateOTP = (): string => {
  return randomize("0", 6);
};

console.log("OTP", generateOTP());

// Send OTP to the provided phone number using Twilio
const sendOTP = (otp:String, phoneNumber:String) => {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  client.messages
    .create({
      body: `Your OTP is: ${otp}`,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    })
    .then((message) => console.log(message.sid))
    .done();
};

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { phone } = req.body;

      const user = await UserModel.create({
        phone,
      });

      if (user) {
        res.status(201).json({
          message: "User created successfully",
          user,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
);
