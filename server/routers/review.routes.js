import { Router } from "express";
import {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getReviewsByDestination,
    getReviewsByHotel,
} from "../controllers/reviewController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.get("/destination/:destinationId", getReviewsByDestination);
router.get("/hotel/:hotelId", getReviewsByHotel);

// Protected routes (Only authenticated users can create/update/delete reviews)
router.post("/", auth, createReview);
router.put("/:id", auth, updateReview);
router.delete("/:id", auth, deleteReview);

export default router;
