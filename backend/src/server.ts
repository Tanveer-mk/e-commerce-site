import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb";
import {connectCloudinary} from "./config/cloudinary";
import {Request, Response} from 'express';
import authRoutes from "./routes/auth.route";
import productRoutes from "./routes/product.route";

// App config
const app = express();
const PORT: number = Number(process.env.PORT) || 5000;
void connectDB();
void connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('index');
})

app.post("/test", (req: Request, res: Response) => {
    res.json("test works");
})


app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
})
