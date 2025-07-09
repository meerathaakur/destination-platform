import { Router } from 'express';
const router = Router();
import { check } from 'express-validator';
import {
    getItineraries,
    getItinerary,
    createItinerary,
    updateItinerary,
    deleteItinerary,
    shareItinerary
} from '../controllers/itinerary.controller.js';
import { AuthenticationMW } from '../middlewares/auth.middleware.js';

// @route   GET /api/itineraries
// @desc    Get all user itineraries
// @access  Private
router.get('/', AuthenticationMW, getItineraries);

// @route   GET /api/itineraries/:id
// @desc    Get single itinerary
// @access  Private
router.get('/:id', AuthenticationMW, getItinerary);

// @route   POST /api/itineraries
// @desc    Create new itinerary
// @access  Private
router.post('/', [
    AuthenticationMW,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('destinations', 'At least one destination is required').isArray({ min: 1 })
    ]
], createItinerary);

// @route   PUT /api/itineraries/:id
// @desc    Update itinerary
// @access  Private
router.put('/:id', [
    AuthenticationMW,
    [
        check('title', 'Title is required if provided').optional().not().isEmpty(),
        check('destinations', 'Destinations must be an array').optional().isArray()
    ]
], updateItinerary);

// @route   DELETE /api/itineraries/:id
// @desc    Delete itinerary
// @access  Private
router.delete('/:id', AuthenticationMW, deleteItinerary);

// @route   POST /api/itineraries/:id/share
// @desc    Share itinerary with other users
// @access  Private
router.post('/:id/share', AuthenticationMW, shareItinerary);

export default router;