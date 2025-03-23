import mongoose from "mongoose"
const { connect } =mongoose;
import "dotenv/config"
const MONGO_URL=process.env.MONGO_URI || process.env.MONGO_URL_PROD

export async function connectDB(){
    try {
        await connect(MONGO_URL)
        console.log("Database connected")
    } catch (error) {
        console.log("Db connection failed", error.message)
        process.exit(1);
    }
}