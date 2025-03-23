import mongoose from "mongoose";

const { Schema, model } = mongoose;

const hotelSchema = new Schema(
    {
        name: { type: String, required: true }, // Hotel name
        destinationId: { type: Schema.Types.ObjectId, ref: "Destination", required: true }, // Related destination
        address: { type: String, required: true }, // Full address
        images: [{ type: String }], // Array of image URLs
        rating: { type: Number, min: 0, max: 5, default: 2 }, // User rating (0-5 stars)
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }], // Linked hotel reviews
        pricePerNight: { type: Number, required: true }, // Price per night
        roomTypes: {
            type: [String],
            enum: ["Deluxe", "Suite", "Family", "Standard", "Royal Suite"]
        }, // Available room types
        contact: {
            phone: { type: String, match: [/^\d{10}$/, "Phone number must be exactly 10 digits"] }, // Ensures a valid phone number format
            email: { type: String, lowercase: true, trim: true },
        },
        website: { type: String, trim: true }, // Hotel website
    },
    { timestamps: true }
);

const Hotel = model("Hotel", hotelSchema);

export default Hotel;
