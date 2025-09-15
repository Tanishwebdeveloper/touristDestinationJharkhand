import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String },         // Required for local users
  googleId: { type: String },         // For Google users
});

export default mongoose.model('User', userSchema);