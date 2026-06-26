import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.adminToken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized, login again'
            });
        } else {
            const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
            if (!(decoded === String(process.env.ADMIN_EMAIL) + String(process.env.ADMIN_PASSWORD))) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized, login again'
                });
            }
            next();
        }
    } catch (e: any) {
        res.status(500).json({success: false, message: 'Internal Server Error'});
        console.error("backend/src/middleware/adminAuth.ts/adminAuth: " + e.message);
    }
}