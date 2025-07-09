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

import { AuthenticationMW, authorizeRole, validateRegister } from "../middlewares/auth.middleware.js";
import { updateUserRole } from "../controllers/role.controller.js";

const authRouter = express.Router();

// Public routes (no authentication required)
authRouter.post("/register",validateRegister, register);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-password", resetPassword);

// Protected routes (authentication required)
authRouter.get("/me", AuthenticationMW, getCurrentUser);
authRouter.put("/updatepassword", AuthenticationMW, updatePassword);

// User dashboard (authenticated users only)
authRouter.get("/user-dashboard", AuthenticationMW, (req, res) => {
    res.json({ message: "Welcome to the User Dashboard!" });
});

// Admin routes (admin access required)
authRouter.get("/admin-dashboard", AuthenticationMW, authorizeRole("admin", "superadmin"), (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard!" });
});
authRouter.put("/update-role", AuthenticationMW, authorizeRole("admin", "superadmin"), updateUserRole);

// Super admin routes (super admin access required)
authRouter.get("/superadmin-dashboard", AuthenticationMW, authorizeRole("superadmin"), (req, res) => {
    res.json({ message: "Welcome to the Super Admin Dashboard!" });
});
export default authRouter;
