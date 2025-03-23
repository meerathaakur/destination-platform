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
    // location: { type: String, trim: true },

    // Role field to differentiate between user and admin
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "user", // Default role is 'user'
    },

    // savedDestinations: [
    //   {
    //     name: { type: String, required: true, trim: true },
    //     country: { type: String, trim: true },
    //     image: { type: String, default: "" },
    //   },
    // ],

    resetToken: { type: String, default: null },

    // travelHistory: [
    //   {
    //     name: { type: String, required: true, trim: true },
    //     country: { type: String, trim: true },
    //     visitedDate: { type: Date, default: Date.now },
    //   },
    // ],

    preferences: {
      budget: { type: String, enum: ["low", "medium", "high"], default: "medium" },
      interests: [{ type: String, trim: true }],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
