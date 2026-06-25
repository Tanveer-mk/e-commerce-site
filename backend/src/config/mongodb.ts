import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`, {});
        console.log("Connected to MongoDB:", connection.connection.host);
    } catch (error) {
        console.log("Error in connecting to database: " + error);
    }
}

export default connectDB;