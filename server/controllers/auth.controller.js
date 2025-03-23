import User from "../models/User.js";
import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

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

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ success: false, error: "User already exists with this email" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Generate JWT token
        const token = generateToken(user.id);

        res.status(201).json({
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
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Invalid credentials" });
        }

        const token = generateToken(user.id);

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

        // In a real implementation, you would:
        // 1. Generate a reset token
        // 2. Save it to the user record with an expiration
        // 3. Send an email with a reset link

        res.json({ success: true, message: "Password reset instructions sent to your email" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: "Server error" });
    }
}
