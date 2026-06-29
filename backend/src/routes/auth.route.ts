import express from "express";
import {
    userRegister,
    userLogin,
    adminLogin,
    userLogout,
    adminLogout,
    verifyAdmin, verifyUser
} from "../controllers/auth.controller";
import {userAuth} from "../middleware/userAuth";
import {adminAuth} from "../middleware/adminAuth";

const Router = express.Router();

Router.post("/register", userRegister);
Router.post("/login", userLogin);
Router.post("/logout", userLogout);
Router.post("/admin-login", adminLogin);
Router.post("/admin-logout", adminLogout);
Router.get("/verify-admin", adminAuth, verifyAdmin);
Router.get("/verify-user", userAuth, verifyUser);

export default Router;