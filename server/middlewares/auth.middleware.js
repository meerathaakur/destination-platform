import "dotenv/config"
import jwt, { decode } from "jsonwebtoken"

import { check } from "express-validator";
const { verify } = jwt;

export function AuthenticationMW(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided. Please log in." });
    }

    const token = authHeader?.split(" ")[1]
    verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token. Please log in again." });
        }
        // Token decoded successfully
        req.user = decoded
        console.log(decode)
        next()
    })
}
// Middleware to validate user registration input
export const validateRegister = [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Invalid email format"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    check("phone").matches(/^\d{10}$/).withMessage("Phone number must be exactly 10 digits"),
];


// Middleware to check role
export function authorizeRole(...allowedRoles) {
    
    return (req, res, next) => {
        console.log(allowedRoles,req.user)
        if (!allowedRoles.includes(req.user?.role)) {
            return res.status(403).json({ message: "Access Denied: Insufficient Permissions" });
        }
        next();
    };
}