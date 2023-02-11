import { Request,Response } from "express";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/userModel";


export const registerUser = asyncHandler(async (req: Request, res: Response) => {
     try {
        const {phone} = req.body;

        const user = await UserModel.create({
            phone
        })

        if(user){
            res.status(201).json({
                message: "User created successfully",
                user
            })
        }

     } catch (error) {
        console.error(error);
     }
})