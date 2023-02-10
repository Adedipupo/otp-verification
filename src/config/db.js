"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const message = process.env.NODE_ENV !== "production"
    ? "Successfully connected to MongoDB Atlas!"
    : "Successfully connected to MongoDB Local!";
const connectDB = () => {
    const url = process.env.DATABASE_URL;
    mongoose_1.default
        .connect(url)
        .then(() => {
        console.log("info", message);
    })
        .catch((error) => {
        console.log("error", error.message);
    });
};
exports.default = connectDB;
