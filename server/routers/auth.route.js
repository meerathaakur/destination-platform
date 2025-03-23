import express from "express";
import {
    register,
    login,
    getCurrentUser,
    updatePassword,
    forgotPassword,
    verifyOTP,
    resetPassword
} from "../controllers/auth.controller.js";

import { AuthenticationMW, isAdmin, isSuperAdmin } from "../middlewares/auth.middleware.js";
import { updateUserRole } from "../controllers/role.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", AuthenticationMW, getCurrentUser);
authRouter.put("/updatepassword", AuthenticationMW, updatePassword);

authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-password", resetPassword);

// Admin-only route
authRouter.get("/admin-dashboard", AuthenticationMW, isAdmin, (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard!" });
});

// Superadmin-only route
authRouter.get("/superadmin-dashboard", AuthenticationMW, isSuperAdmin, (req, res) => {
    res.json({ message: "Welcome to the Super Admin Dashboard!" });
});

authRouter.put("/update-role", AuthenticationMW, isAdmin, updateUserRole);


// Only authenticated users can access this
authRouter.get("/user-dashboard", AuthenticationMW, (req, res) => {
    res.json({ message: "Welcome to the User Dashboard!" });
});

// Only admins can access this
authRouter.get("/admin-dashboard", AuthenticationMW, isAdmin, (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard!" });
});

// Only superadmins can access this
authRouter.get("/superadmin-dashboard", AuthenticationMW, isSuperAdmin, (req, res) => {
    res.json({ message: "Welcome to the Super Admin Dashboard!" });
});
export default authRouter;
