import express from "express";
import {userRegister, userLogin, adminLogin, userLogout, adminLogout} from "../controllers/auth.controller";

const Router = express.Router();

Router.post("/register", userRegister);
Router.post("/login", userLogin);
Router.post("/logout", userLogout);
Router.post("/admin-login", adminLogin);
Router.post("/admin-logout", adminLogout);

export default Router;