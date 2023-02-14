import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";
import twilio from "twilio";
import randomize from "randomatic";

// Generate a random OTP
const generateOTP = (): string => {
  return randomize("0", 6);
};

console.log("OTP1234", generateOTP());

// Send OTP to the provided phone number using Twilio
const sendOTP = (otp:string, phoneNumber:string) => {
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
};



export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        res.status(400)
        throw new Error('Please provide a valid phone number')
      }
    
      const userExists = await UserModel.findOne({ phoneNumber:String })
      if (userExists) {
        res.status(400)
        throw new Error('Phone number already exists')
      }

    const otp = generateOTP();

    console.log("OTP234", otp);
  
    const user = new UserModel({ phoneNumber, otp });
    try {
      await user.save();
      sendOTP(otp, phoneNumber);
      res.json({ message: "User registered successfully. OTP sent." });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);
