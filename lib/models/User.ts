import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Password is optional for OAuth users
  name: { type: String }, // Store the user's name from Google
  image: { type: String }, // Store profile picture from Google
  provider: { type: String, required: true, default: "credentials" }, // Track auth provider
  createdAt: { type: Date, default: Date.now }, // Add creation timestamp
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
