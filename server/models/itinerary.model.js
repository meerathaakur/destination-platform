import mongoose from "mongoose";

const { Schema, model } = mongoose;

const itinerarySchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        destinations: [{
            destinationId: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, required: true },
            notes: { type: String },
            accommodations: [{
                hotelId: { type: Schema.Types.ObjectId, ref: "Hotel" },
                checkIn: { type: Date },
                checkOut: { type: Date }
            }],
            activities: [{
                name: { type: String, required: true },
                time: { type: String },
                cost: { type: Number },
                notes: { type: String }
            }]
        }],
        totalCost: { type: Number, default: 0 },
        duration: { type: Number }, // Number of days
        isShared: { type: Boolean, default: false },
        sharedWith: [{ type: Schema.Types.ObjectId, ref: "User" }],
        status: { 
            type: String, 
            enum: ["planning", "booked", "completed", "cancelled"], 
            default: "planning" 
        }
    },
    { timestamps: true }
);

const Itinerary = model("Itinerary", itinerarySchema);

export default Itinerary;
