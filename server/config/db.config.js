import { connect } from "mongoose"
import "dotenv/config"
const MONGO_URL=process.env.MONGO_URI

export async function connectDB(){
    try {
        await connect(MONGO_URL)
        console.log("Database connected")
    } catch (error) {
        console.log("Db connection failed", error.message)
        process.exit(1);
    }
}