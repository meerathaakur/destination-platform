import Destination from "../models/destination.model.js";
import redisClient from "../config/redis.config.js";

// ✅ Get All Destinations (with caching)
export const getAllDestinations = async (req, res) => {
    try {
        // Check Redis Cache First
        redisClient.get("allDestinations", async (err, cachedData) => {
            if (err) console.error("Redis GET Error:", err);

            if (cachedData) {
                return res.status(200).json({ source: "cache", data: JSON.parse(cachedData) });
            }

            const destinations = await Destination.find();
            redisClient.setex("allDestinations", 3600, JSON.stringify(destinations)); // Cache for 1 hour

            res.status(200).json({ source: "database", data: destinations });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Search Destinations (by name or location)
export const searchDestinations = async (req, res) => {
    try {
        const { query } = req.query;
        const destinations = await Destination.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { location: { $regex: query, $options: "i" } }
            ]
        });
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ message: "Error searching destinations", error });
    }
};

// ✅ Get Destination by ID
export const getDestinationById = async (req, res) => {
    try {
        const { id } = req.params;
        const destination = await Destination.findById(id);
        if (!destination) return res.status(404).json({ message: "Destination not found" });

        res.status(200).json(destination);
    } catch (error) {
        res.status(500).json({ message: "Error fetching destination", error });
    }
};

// ✅ Get Recommendations (based on user preferences)
export const getRecommendations = async (req, res) => {
    try {
        const { preference } = req.body;

        // Example: Recommend based on category
        const recommendations = await Destination.find({ category: preference });
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recommendations", error });
    }
};

// ✅ Compare Destinations (based on ratings & price)
export const compareDestinations = async (req, res) => {
    try {
        const { destinationIds } = req.body;
        const destinations = await Destination.find({ _id: { $in: destinationIds } })
            .sort({ rating: -1, price: 1 });

        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ message: "Error comparing destinations", error });
    }
};

// ✅ Create Destination (Admin Only)
export const createDestination = async (req, res) => {
    try {
        const newDestination = new Destination(req.body);
        const savedDestination = await newDestination.save();

        // Invalidate Cache
        redisClient.del("allDestinations");

        res.status(201).json(savedDestination);
    } catch (error) {
        res.status(500).json({ message: "Error creating destination", error });
    }
};

// ✅ Update Destination (Admin Only)
export const updateDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDestination = await Destination.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedDestination) return res.status(404).json({ message: "Destination not found" });

        // Invalidate Cache
        redisClient.del("allDestinations");

        res.status(200).json(updatedDestination);
    } catch (error) {
        res.status(500).json({ message: "Error updating destination", error });
    }
};

// ✅ Delete Destination (Admin Only)
export const deleteDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDestination = await Destination.findByIdAndDelete(id);

        if (!deletedDestination) return res.status(404).json({ message: "Destination not found" });

        // Invalidate Cache
        redisClient.del("allDestinations");

        res.status(200).json({ message: "Destination deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting destination", error });
    }
};
