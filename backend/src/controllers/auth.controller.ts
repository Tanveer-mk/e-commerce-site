import {Request, Response} from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import {genCookie} from "../utils/genCookie";

const createToken = (id: string) => {
    const JWT_SECRET = String(process.env.JWT_SECRET);
    return jwt.sign({id}, JWT_SECRET);
}

const userRegister = async (req: Request, res: Response) => {
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
        genCookie("token", token, res);

        res.status(201).json({success: true, user});

    } catch (e: any) {
        console.error("Error in backend/src/controllers/auth.controller.ts/userRegister: " + e.message);
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

        genCookie("token", token, res);
        res.status(201).json({success: true, user});

    } catch (e: any) {
        res.status(500).json({success: false, message: "Internal server error"});
        console.error("Error in backend/src/controllers/auth.controller.ts/userLogin: " + e.message);
    }
}

const userLogout = async (req: Request, res: Response) => {
    try {
        if (req.cookies.token) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax"
            });
            res.status(200).json({success: true, message: "Logout successfully"});
        } else {
            res.status(401).json({success: false, message: "Unauthorized"});
        }
    } catch (e: any) {
        res.status(500).json({success: false, message: "Internal server error"});
        console.error("Error in backend/src/controllers/auth.controller.ts/userLogout: " + e.message);
    }
}
const adminLogout = async (req: Request, res: Response) => {
    try {
        if (req.cookies.adminToken) {
            res.clearCookie("adminToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax"
            });
            res.status(200).json({success: true, message: "Logout successfully"});
        } else {
            res.status(401).json({success: false, message: "Unauthorized"});
        }
    } catch (e: any) {
        res.status(500).json({success: false, message: "Internal server error"});
        console.error("Error in backend/src/controllers/auth.controller.ts/adminLogout: " + e.message);
    }
}

const adminLogin = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, String(process.env.JWT_SECRET));
            genCookie("adminToken", token, res);
            res.status(200).json({success: true, message: "Admin Login successfully"});
        } else {
            res.status(401).json({success: false, message: "Invalid credentials"});
        }
    } catch (e: any) {
        res.status(500).json({success: false, message: "Internal server error"});
        console.error("Error in backend/src/controllers/auth.controller.ts/adminLogin: " + e.message);
    }

}
const verifyAdmin = async (req: Request, res: Response) => {
    try {
        const exists = req.cookies.adminToken;
        if (exists) {
            return res.status(200).json({success: true});
        } else {
            return res.status(401).json({success: false, message: "Session timed out"});
        }
    } catch (e: any) {
        res.status(500).json({success: false, message: "Internal server error"});
        console.error("Error in backend/src/controllers/auth.controller.ts/verifyAdmin: " + e.message);
    }
}

const verifyUser = async (req: Request, res: Response) => {
    try {
        const exists = req.cookies.token;
        if (exists) {
            return res.status(200).json({success: true});
        } else {
            return res.status(401).json({success: false, message: "Session timed out"});
        }
    } catch (e: any) {
        res.status(500).json({success: false, message: "Internal server error"});
        console.error("Error in backend/src/controllers/auth.controller.ts/verifyUser: " + e.message);
    }

}

export {userRegister, userLogin, adminLogin, userLogout, adminLogout, verifyAdmin, verifyUser};