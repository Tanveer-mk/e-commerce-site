import {Request, Response} from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

const createToken = (id: string) => {
    const JWT_SECRET = String(process.env.JWT_SECRET);
    return jwt.sign({id}, JWT_SECRET);
}

const userRegister = async (req: Request, res: Response) => {
    console.log("userRegister called")
    try {
        const {name, email, password} = req.body;

        const exists = await userModel.findOne({email});

        if (exists) {
            return res.status(409).json({success: false, error: "user with that email id already exists"});
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({success: false, error: "invalid email"});
        }
        if (password.length < 8) {
            return res.status(400).json({success: false, error: "password must be at least 8 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({name, email, password: hashedPassword});
        const user = await newUser.save();

        const token = createToken(user._id);
        res.status(201).json({success: true, token, user});

    } catch (err: any) {
        console.error("Error in backend/src/controllers/auth.controller.ts/userRegister: " + err.message);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

const userLogin = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({success: false, message: "user doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success: false, message: "invalid credentials"});
        }

        const token = createToken(user._id);
        res.status(201).json({success: true, token, user});

    } catch (err: any) {
        res.status(500).json({success: false, message: "Internal server error"});
        console.error("Error in backend/src/controllers/auth.controller.ts/userLogin: " + err.message);
    }
}


const adminLogin = async (req: Request, res: Response) => {
    //route for admin login
    res.json("admin login");
}

export {userRegister, userLogin, adminLogin};