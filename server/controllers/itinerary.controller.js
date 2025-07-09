import Itinerary from "../models/itinerary.model.js";

export const getItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ userId: req.user.id });
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getItinerary = async (req, res) => {
    try {
        const { id } = req.params;
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });
        
        // Check if user owns this itinerary
        if (itinerary.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }
        
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: "Error fetching itinerary", error });
    }
};

export const getAllItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.status(200).json(itineraries);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const getItineraryById = async (req, res) => {
    try {
        const { id } = req.params;
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });
        res.status(200).json(itinerary);
    } catch (error) {
        res.status(500).json({ message: "Error fetching itinerary", error });
    }
};

export const createItinerary = async (req, res) => {
    try {
        const newItinerary = new Itinerary(req.body);
        const savedItinerary = await newItinerary.save();
        res.status(201).json(savedItinerary);
    } catch (error) {
        res.status(500).json({ message: "Error creating itinerary", error });
    }
};

export const updateItinerary = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItinerary = await Itinerary.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItinerary) return res.status(404).json({ message: "Itinerary not found" });
        res.status(200).json(updatedItinerary);
    } catch (error) {
        res.status(500).json({ message: "Error updating itinerary", error });
    }
};

export const deleteItinerary = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItinerary = await Itinerary.findByIdAndDelete(id);
        if (!deletedItinerary) return res.status(404).json({ message: "Itinerary not found" });
        res.status(200).json({ message: "Itinerary deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting itinerary", error });
    }
};

export const shareItinerary = async (req, res) => {
    try {
        const { id } = req.params;
        const { shareWith } = req.body; // Array of user emails or IDs to share with
        
        const itinerary = await Itinerary.findById(id);
        if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });
        
        // Check if user owns this itinerary
        if (itinerary.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Access denied" });
        }
        
        // Add shared users (this would need to be implemented based on your itinerary model)
        itinerary.sharedWith = shareWith;
        await itinerary.save();
        
        res.status(200).json({ message: "Itinerary shared successfully", itinerary });
    } catch (error) {
        res.status(500).json({ message: "Error sharing itinerary", error });
    }
};
