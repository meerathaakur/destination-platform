import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        destinationId: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        hotelId: { type: Schema.Types.ObjectId, ref: "Hotel" }, // Not necessarily required
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const Review = model("Review", reviewSchema);

export default Review;
