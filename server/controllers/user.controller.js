import User from "../models/user.model.js";
import Destination from "../models/destination.model.js";

// ✅ Get All Users (without caching)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password field
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get User by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

// ✅ Update User
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password");

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};

// ✅ Save Destination
export const saveDestination = async (req, res) => {
    try {
        const { id } = req.params;
        const { destinationId } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.savedDestinations.includes(destinationId)) {
            user.savedDestinations.push(destinationId);
            await user.save();
        }

        res.status(200).json({ message: "Destination saved", savedDestinations: user.savedDestinations });
    } catch (error) {
        res.status(500).json({ message: "Error saving destination", error });
    }
};

// ✅ Remove Saved Destination
export const removeSavedDestination = async (req, res) => {
    try {
        const { id, destinationId } = req.params;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.savedDestinations = user.savedDestinations.filter(dest => dest.toString() !== destinationId);
        await user.save();

        res.status(200).json({ message: "Destination removed", savedDestinations: user.savedDestinations });
    } catch (error) {
        res.status(500).json({ message: "Error removing destination", error });
    }
};

// ✅ Get Saved Destinations
export const getSavedDestinations = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate("savedDestinations");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user.savedDestinations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching saved destinations", error });
    }
};

// ✅ Get User Travel History
export const getUserTravelHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate("travelHistory.destination");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user.travelHistory);
    } catch (error) {
        res.status(500).json({ message: "Error fetching travel history", error });
    }
};
