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
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);

// Protected routes
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);
router.post("/:id/save-destination", auth, saveDestination);
router.delete("/:id/remove-destination/:destinationId", auth, removeSavedDestination);
router.get("/:id/saved-destinations", auth, getSavedDestinations);
router.get("/:id/travel-history", auth, getUserTravelHistory);

export default router;
