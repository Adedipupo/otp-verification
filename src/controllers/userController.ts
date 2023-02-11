import { Request,Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";


export const registerUser = asyncHandler(async (req: Request, res: Response) => {
     try {
        const {phone} = req.body;

        const user = await UserModel.create({
            phone
        })
     } catch (error) {
        
     }
})