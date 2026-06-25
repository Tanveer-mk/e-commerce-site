import express from "express";
import {userRegister, userLogin, adminLogin} from "../controllers/auth.controller";

const Router = express.Router();

Router.post("/register", userRegister);
Router.post("/login", userLogin);
Router.post("/admin-login", adminLogin);

export default Router;