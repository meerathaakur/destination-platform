import { Router } from 'express';
const router = Router();
import { check } from 'express-validator';
import { getItineraries, getItinerary, createItinerary, updateItinerary, deleteItinerary, shareItinerary } from '../controllers/itineraryController';
import auth from '../middleware/auth';

// @route   GET /api/itineraries
// @desc    Get all user itineraries
// @access  Private
router.get('/', auth, getItineraries);

// @route   GET /api/itineraries/:id
// @desc    Get single itinerary
// @access  Private
router.get('/:id', auth, getItinerary);

// @route   POST /api/itineraries
// @desc    Create new itinerary
// @access  Private
router.post('/', [
    auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('destinations', 'At least one destination is required').isArray({ min: 1 })
    ]
], createItinerary);

// @route   PUT /api/itineraries/:id
// @desc    Update itinerary
// @access  Private
router.put('/:id', [
    auth,
    [
        check('title', 'Title is required if provided').optional().not().isEmpty(),
        check('destinations', 'Destinations must be an array').optional().isArray()
    ]
], updateItinerary);

// @route   DELETE /api/itineraries/:id
// @desc    Delete itinerary
// @access  Private
router.delete('/:id', auth, deleteItinerary);

// @route   POST /api/itineraries/:id/share
// @desc    Share itinerary with other users
// @access  Private
router.post('/:id/share', auth, shareItinerary);

export default router;