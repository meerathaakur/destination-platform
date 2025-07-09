import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { connectDB } from "./config/db.config.js";
import { v2 as cloudinary } from "cloudinary";
import userModel from "./models/user.model.js";

// Import Routes (Uncomment when routes are available)
import authRouter from "./routers/auth.route.js";
import userRoutes from "./routers/user.router.js";
import destinationRoutes from "./routers/destination.route.js";
import reviewRoutes from "./routers/review.routes.js";
import itineraryRoutes from "./routers/itinerary.routes.js";
import surveyRoutes from "./routers/survey.routes.js";

// Import middleware
import { AuthenticationMW } from "./middlewares/auth.middleware.js";

const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
// ✅ Configure CORS correctly
app.use(cors({
    origin: ["https://destination-platform.vercel.app", "http://localhost:5173"],  // 🔹 Allow both frontend URLs
    credentials: true,                 // 🔹 Allow sending cookies (HttpOnly)
    methods: "GET,POST,PUT,DELETE",    // 🔹 Allowed request methods
    allowedHeaders: "Content-Type,Authorization" // 🔹 Allowed headers
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Routes Middleware
app.use("/api/users", userRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/survey", surveyRoutes);

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
app.use("/api/auth", authRouter);

// Error handling middleware (Uncomment when implemented)
// app.use(AuthenticationMW);

app.listen(port, async () => {
    await connectDB()
    console.log(`Server is running at port ${port}`);
});

// export default app;
