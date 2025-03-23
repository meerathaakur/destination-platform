import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    profilePicture: { type: String, default: "" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // Ensure to hash before saving
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },
    location: { type: String, trim: true },
    savedDestinations: [{ type: Schema.Types.ObjectId, ref: "Destination" }],
    resetToken: { type: String, default: null },
    travelHistory: [
      {
        destination: { type: Schema.Types.ObjectId, ref: "Destination" },
        visitedDate: { type: Date, default: Date.now },
      },
    ],
    preferences: {
      budget: { type: String, enum: ["low", "medium", "high"], default: "medium" },
      interests: [{ type: String, trim: true }],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
