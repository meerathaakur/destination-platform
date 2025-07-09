import { Router } from 'express';
const router = Router();
import {
    getAllDestinations,
    searchDestinations,
    getDestinationById,
    getRecommendations,
    compareDestinations,
    createDestination,
    updateDestination,
    deleteDestination
} from '../controllers/destination.controller.js';
import { AuthenticationMW, authorizeRole } from '../middlewares/auth.middleware.js';

// Public routes
router.get('/', getAllDestinations);
router.get('/search', searchDestinations);
router.get('/:id', getDestinationById);
router.post('/recommendations', getRecommendations);
router.post('/compare', compareDestinations);

// Protected routes (admin only)
router.post('/', [AuthenticationMW, authorizeRole("admin", "superadmin")], createDestination);
router.put('/:id', [AuthenticationMW, authorizeRole("admin", "superadmin")], updateDestination);
router.delete('/:id', [AuthenticationMW, authorizeRole("admin", "superadmin")], deleteDestination);

export default router;
