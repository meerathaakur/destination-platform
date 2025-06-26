import "dotenv/config"
import jwt from "jsonwebtoken"

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
        console.log("printing decodedfrom Authentication middleware")
        console.log(decoded)
        req.user = decoded
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



// export function AuthenticationMW(req, res, next) {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Access Denied! No Token Provided" });
//     }

//     jwt.verify(token, "secret-key", (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: "Invalid Token" });
//         } else {
//             console.log("Decoded User:", decoded);
//             req.user = decoded; // Store user info in request
//             next();
//         }
//     });
// }

// Middleware to check if the user is an admin
export function isAdmin(req, res, next) {
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Access Denied! Admins only." });
    }
    next();
}

// Middleware to check if the user is a superadmin
export function isSuperAdmin(req, res, next) {
    if (req.user.role !== "superadmin") {
        return res.status(403).json({ message: "Access Denied! Super Admins only." });
    }
    next();
}
