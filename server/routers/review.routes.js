import { Router } from "express";
import {
    getAllReviews,
    getReviewById,
    getReviewsByDestination,
    getReviewsByHotel,
    createReview,
    updateReview,
    deleteReview
} from "../controllers/review.controller.js";
import { AuthenticationMW } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.get("/destination/:destinationId", getReviewsByDestination);
router.get("/hotel/:hotelId", getReviewsByHotel);

// Protected routes (Only authenticated users can create/update/delete reviews)
router.post("/", AuthenticationMW, createReview);
router.put("/:id", AuthenticationMW, updateReview);
router.delete("/:id", AuthenticationMW, deleteReview);

export default router;
