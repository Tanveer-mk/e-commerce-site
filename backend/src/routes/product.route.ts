import express from "express";
import {getProducts, removeProduct, getProduct, addProduct} from "../controllers/product.controller";
import upload from "../middleware/multer";

const Router = express.Router();

Router.post("/add", upload.fields([
    {name: "image1", maxCount: 1},
    {name: "image2", maxCount: 1},
    {name: "image3", maxCount: 1},
    {name: "image4", maxCount: 1}
]), addProduct);

Router.post("/remove", removeProduct);
Router.post("/get", getProduct);
Router.get("/get-all", getProducts);

export default Router;