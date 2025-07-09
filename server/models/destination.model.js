import mongoose from "mongoose";

const { Schema, model } = mongoose;

const destinationSchema = new Schema(
    {
        name: { type: String, required: true }, // Destination name (e.g., Mussoorie)
        location: { type: String, required: true }, // General location (e.g., Uttarakhand, India)
        coordinates: {
            latitude: { type: Number, required: true },
            longitude: { type: Number, required: true },
        },
        description: { type: String, required: true }, // Brief description
        attractions: [
            {
                category: { type: String, enum: ["food", "must_see", "lifestyle"], required: true },
                name: { type: String, required: true },
                image: { type: String },
            },
        ],
        locationType: [
            {
                type: String,
                enum: [
                    "Mountains",
                    "Forest",
                    "Beaches",
                    "Luxury",
                    "Trekking",
                    "Spiritual",
                    "Heritage",
                    "Religious",
                    "Festival",
                    "Historical",
                    "Lifestyle"
                ],
            },
        ],
        reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
        hotels: [{ type: Schema.Types.ObjectId, ref: "Hotel" }],
        bestTimeToVisit: { type: String }, // Example: "October - March"
        weather: { type: String }, // Example: "Cold, Snowfall in Winter"
        estimatedCost: { type: Number }, // Average trip cost in local currency
    },
    { timestamps: true }
);

const Destination = model("Destination", destinationSchema);

export default Destination;
