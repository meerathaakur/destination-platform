import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// Redis Configuration
const redisClient = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 3000,
    password: process.env.REDIS_PASSWORD || "", // Add password if required
    retryStrategy: (times) => Math.min(times * 50, 2000), // Reconnect logic
});

// Event Listeners
redisClient.on("connect", () => console.log("🚀 Connected to Redis"));
redisClient.on("error", (err) => console.error("❌ Redis Error:", err));
redisClient.on("reconnecting", () => console.log("♻️ Reconnecting to Redis..."));

// Export Redis Client
export default redisClient;
