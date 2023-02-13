import { Document } from "mongoose";


interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    otp: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
  }

  export {IUser};