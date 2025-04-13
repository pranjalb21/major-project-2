import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()


const URI = process.env.MONGO_URI;

const initializeDB = async () => {
    await mongoose
        .connect(URI)
        .then(() => {
            console.log("DB connected successfully.");
        })
        .catch((e) => console.log("Error connecting to Database", e));
};
export default initializeDB;
