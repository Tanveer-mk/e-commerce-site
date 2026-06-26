import {Response} from "express";

export const genCookie = (name: string, token: string, res: Response) => {
    return res.cookie(name, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "PRODUCTION",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7 * 1000,
    })
}