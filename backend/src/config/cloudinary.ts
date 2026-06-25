import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async () => {
    const CLOUD_NAME = String(process.env.CLOUDINARY_NAME);
    const API_SECRET = String(process.env.CLOUDINARY_API_SECRET);
    const API_KEY = String(process.env.CLOUDINARY_API_KEY);

    try {
        cloudinary.config({
            cloud_name: CLOUD_NAME,
            api_key: API_KEY,
            api_secret: API_SECRET
        });
        console.log("Connected to cloudinary");
    } catch (err) {
        console.error("Error connecting cloudinary credentials", err);
    }
}

export {connectCloudinary}