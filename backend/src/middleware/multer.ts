import multer from "multer";
import {Request} from "express";

const storage = multer.diskStorage({
    filename: (req: Request, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage});

export default upload;