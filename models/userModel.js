const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Role for different user types
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields automatically

userSchema.index({ email: 1 }); // Index to speed up queries on the email field

const User = mongoose.model("User", userSchema);

module.exports = User;
