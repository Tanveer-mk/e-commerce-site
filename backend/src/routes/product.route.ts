import express from "express";
import {getProducts, removeProduct, getProduct, addProduct} from "../controllers/product.controller";
import upload from "../middleware/multer";
import {adminAuth} from "../middleware/adminAuth"

const Router = express.Router();

Router.post("/add", adminAuth, upload.fields([
    {name: "image1", maxCount: 1},
    {name: "image2", maxCount: 1},
    {name: "image3", maxCount: 1},
    {name: "image4", maxCount: 1}
]), addProduct);

Router.post("/remove", adminAuth, removeProduct);
Router.post("/get", adminAuth, getProduct);
Router.get("/get-all", adminAuth, getProducts);

export default Router;