import { Router } from 'express';
const router = Router();
import { getAllDestinations, searchDestinations, getDestinationById, getRecommendations, compareDestinations, createDestination, updateDestination, deleteDestination } from '../controllers/destinationController';
import { auth, adminAuth } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';

// Public routes
router.get('/', getAllDestinations);
router.get('/search', searchDestinations);
router.get('/:id', getDestinationById);
router.post('/recommendations', getRecommendations);
router.post('/compare', compareDestinations);

// Protected routes (admin only)
router.post('/', [auth, adminAuth], createDestination);
router.put('/:id', [auth, adminAuth], updateDestination);
router.delete('/:id', [auth, adminAuth], deleteDestination);

export default router;
