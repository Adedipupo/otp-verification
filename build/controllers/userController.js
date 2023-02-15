"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = require("../models/userModel");
const twilio_1 = __importDefault(require("twilio"));
const randomatic_1 = __importDefault(require("randomatic"));
// Generate a random OTP
const generateOTP = () => {
    return (0, randomatic_1.default)("0", 6);
};
console.log("OTP1234", generateOTP());
// Send OTP to the provided phone number using Twilio
const sendOTP = (otp, phoneNumber) => {
    const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    client.messages
        .create({
        body: `Your OTP is: ${otp}`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
    })
        .then((message) => console.log(message.sid));
};
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
        res.status(400);
        throw new Error('Please provide a valid phone number');
    }
    const userExists = yield userModel_1.UserModel.findOne({ phoneNumber: String });
    if (userExists) {
        res.status(400);
        throw new Error('Phone number already exists');
    }
    const otp = generateOTP();
    console.log("OTP234", otp);
    const user = new userModel_1.UserModel({ phoneNumber, otp });
    try {
        yield user.save();
        sendOTP(otp, phoneNumber);
        res.json({ message: "User registered successfully. OTP sent." });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.verifyOtp = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, otp } = req.body;
    if (!phoneNumber || !otp) {
        res.status(400);
        throw new Error('Please provide a valid phone number and OTP');
    }
    try {
        const user = yield userModel_1.UserModel.findOne({ phoneNumber });
        if (!user) {
            return res.status(400).json({ message: "User not found." });
        }
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Incorrect OTP." });
        }
        res.json({ message: "OTP verified successfully." });
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
