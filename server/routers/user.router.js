import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    saveDestination,
    removeSavedDestination,
    getSavedDestinations,
    getUserTravelHistory,
} from "../controllers/user.controller.js";
import { AuthenticationMW } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);

// Protected routes
router.put("/:id", AuthenticationMW, updateUser);
router.delete("/:id", AuthenticationMW, deleteUser);
router.post("/:id/save-destination", AuthenticationMW, saveDestination);
router.delete("/:id/remove-destination/:destinationId", AuthenticationMW, removeSavedDestination);
router.get("/:id/saved-destinations", AuthenticationMW, getSavedDestinations);
router.get("/:id/travel-history", AuthenticationMW, getUserTravelHistory);

export default router;
