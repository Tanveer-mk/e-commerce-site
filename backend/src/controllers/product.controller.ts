import {Request, Response} from "express";
import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel";

interface UploadedFiles {
    image1: Express.Multer.File[] | undefined;
    image2: Express.Multer.File[] | undefined;
    image3: Express.Multer.File[] | undefined;
    image4: Express.Multer.File[] | undefined;
}

const addProduct = async (req: Request, res: Response) => {

    try {
        const {name, description, price, sizes, category, subCategory, bestseller} = req.body;

        const files = req.files as unknown as UploadedFiles;

        const image1 = files?.image1?.[0]
        const image2 = files?.image2?.[0]
        const image3 = files?.image3?.[0]
        const image4 = files?.image4?.[0]

        const images = [image1, image2, image3, image4].filter((image) => image !== undefined);

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )


        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            date: Date.now(),
            bestseller: bestseller === "true",
        }

        const newProduct = new productModel(productData)
        await newProduct.save();

        res.status(201).json({success: true, message: 'Product created successfully.'})

    } catch (e: any) {
        res.status(500).json({success: false, message: 'Failed to add product'});
        console.error("backend/src/models/productModel.ts/addProduct: " + e.message);
    }
}

const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productModel.find({});
        res.status(200).json({success: true, products});
    } catch (e: any) {
        res.status(500).json({success: false, message: 'Failed to get all products'});
        console.error("backend/src/models/productModel.ts/getProducts: " + e.message);
    }

}
const removeProduct = async (req: Request, res: Response) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success: true, message: 'Product deleted successfully.'})
    } catch (e: any) {
        res.status(500).json({success: false, message: 'Failed to remove product'});
        console.error("backend/src/models/productModel.ts/removeProduct: " + e.message);
    }
}
const getProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.body;

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }

        res.status(200).json({success: true, product})
    } catch (e: any) {
        res.status(500).json({success: false, message: 'Failed to get product'});
        console.error("backend/src/models/productModel.ts/getProduct: " + e.message);
    }
}

export {addProduct, removeProduct, getProducts, getProduct}