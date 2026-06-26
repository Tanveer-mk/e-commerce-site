import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express'
import userModel from "../models/userModel";

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized, login again'
            });
        } else {
            const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
            const exists = await userModel.exists({_id: decoded});
            if (!exists) {
                return res.status(401).json({success: false, message: 'Authentication failed'});
            }
            next();
        }
    } catch (e: any) {
        res.status(500).json({success: false, message: 'Internal Server Error'});
        console.error("backend/src/middleware/userAuths.ts/userAuth: " + e.message);
    }
}
