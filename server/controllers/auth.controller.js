import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
const { sign } = jwt;
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import OTPModel from "../models/otp.model.js";
import { sendOTP } from "../config/mailer.config.js";


// Function to generate JWT Token
const generateToken = (userId) => {
    return sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export async function register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password, phone, role } = req.body; // Accept 'role' in the request

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, message: "User already exists. Please login" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Prevent users from setting 'admin' or 'superadmin' roles themselves
        let assignedRole = "user"; // Default role
        if (role && (role === "admin" || role === "superadmin")) {
            return res.status(403).json({ success: false, message: "You cannot assign an admin role yourself" });
        }

        user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: assignedRole, // Ensuring users are not self-assigning higher roles
        });

        await user.save();

        // Generate JWT token
        const token = generateToken(user.id);
        console.log(token)
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (err) {
        console.error(err.message, err);
        res.status(500).json({ success: false, error: "Server error" });
    }
}


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export async function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "User does not exist. Please signup" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        const token = generateToken(user.id);
        console.log(token)
        res.cookie("token", token, {
            httpOnly: true,  // Prevents JavaScript access (more secure)
            secure: false,   // Change to true in production (for HTTPS)
            sameSite: "lax", // Controls cross-site behavior
        });
        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: "Server error" });
    }
}

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export async function getCurrentUser(req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json({
            success: true,
            data: user,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: "Server error" });
    }
}

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
export async function updatePassword(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Current password is incorrect" });
        }

        // Hash new password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: "Server error" });
    }
}

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
export async function forgotPassword(req, res) {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, error: "No user found with that email" });
        }
        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // console.log(otp)
        // Save OTP in database
        await OTPModel.create({ email, otp });

        // Send OTP via email
        await sendOTP(email, otp);

        // In a real implementation, you would:
        // 1. Generate a reset token
        // 2. Save it to the user record with an expiration
        // 3. Send an email with a reset link

        res.json({ message: "OTP sent to your email" });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: "Server error" });
    }
}


export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const otpRecord = await OTPModel.findOne({ email, otp });
        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP or expired" });

        res.json({ message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const resetPassword = async (req, res) => {
    const { email, newPassword, otp } = req.body;

    try {
        // Check OTP
        const otpRecord = await OTPModel.findOne({ email, otp });
        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP or expired" });

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        // Delete OTP after use
        await OTPModel.deleteOne({ email });

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};
