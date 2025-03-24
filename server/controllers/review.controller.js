import Review from "../models/review.model.js";
import Destination from "../models/destination.model.js";
import Hotel from "../models/hotel.model.js";

// ✅ Get All Reviews (without caching)
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().populate("userId", "name profilePicture");
        res.status(200).json({ data: reviews });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get Review by ID
export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id).populate("userId", "name profilePicture");

        if (!review) return res.status(404).json({ message: "Review not found" });

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Error fetching review", error });
    }
};

// ✅ Get Reviews by Destination ID
export const getReviewsByDestination = async (req, res) => {
    try {
        const { destinationId } = req.params;
        const reviews = await Review.find({ destinationId }).populate("userId", "name profilePicture");

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching destination reviews", error });
    }
};

// ✅ Get Reviews by Hotel ID
export const getReviewsByHotel = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const reviews = await Review.find({ hotelId }).populate("userId", "name profilePicture");

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotel reviews", error });
    }
};

// ✅ Create a Review
export const createReview = async (req, res) => {
    try {
        const { userId, destinationId, rating, hotelId, comment } = req.body;

        // Validate destination/hotel existence
        if (destinationId) {
            const destination = await Destination.findById(destinationId);
            if (!destination) return res.status(404).json({ message: "Destination not found" });
        }

        if (hotelId) {
            const hotel = await Hotel.findById(hotelId);
            if (!hotel) return res.status(404).json({ message: "Hotel not found" });
        }

        const newReview = new Review({ userId, destinationId, rating, hotelId, comment });
        await newReview.save();

        res.status(201).json({ message: "Review created successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Error creating review", error });
    }
};

// ✅ Update a Review
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, comment } = req.body;

        const updatedReview = await Review.findByIdAndUpdate(id, { rating, comment }, { new: true });

        if (!updatedReview) return res.status(404).json({ message: "Review not found" });

        res.status(200).json({ message: "Review updated", review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: "Error updating review", error });
    }
};

// ✅ Delete a Review
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);

        if (!deletedReview) return res.status(404).json({ message: "Review not found" });

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting review", error });
    }
};
