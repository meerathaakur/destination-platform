import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv/config";
import passport from "passport";
import { connectDB } from "./config/db.config.js";
import { v2 as cloudinary } from "cloudinary";
import passportConfig from "./config/passport.config.js";
import userModel from "./models/user.model.js";
import redisClient from "./config/redis.config.js";


// Import Routes (Uncomment when routes are available)
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import destinationRoutes from "./routes/destinationRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";
// import itineraryRoutes from "./routes/itineraryRoutes.js";
// import surveyRoutes from "./routes/surveyRoutes.js";

// Import middleware
// import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 3000;

// Initialize passport
passportConfig(passport);
app.use(passport.initialize());

// Middleware
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes Middleware (Uncomment when routes are available)
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/destinations", destinationRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/itineraries", itineraryRoutes);
// app.use("/api/survey", surveyRoutes);

// Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve("client", "build", "index.html"));
//     });
// }

// Default route
app.get("/", (req, res) => {
    res.send("API is working...");
});

// Redis Test - Setting and Retrieving a Key
redisClient.set("myKey", "Hello, Redis!", "EX", 3600, (err, reply) => {
    if (err) console.error("Redis SET Error:", err);
    else console.log("Redis SET Success:", reply);
});

redisClient.get("myKey", (err, value) => {
    if (err) console.error("Redis GET Error:", err);
    else console.log("Stored Value in Redis:", value);
});

// Error handling middleware (Uncomment when implemented)
// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

export default app;
