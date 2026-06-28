import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb";
import {connectCloudinary} from "./config/cloudinary";
import {Request, Response} from 'express';
import authRoutes from "./routes/auth.route";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.route";

// App config
const app = express();
const PORT: number = Number(process.env.PORT) || 5000;
void connectDB();
void connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}));
app.use(cookieParser());

// API endpoints

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('index');
})

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})
