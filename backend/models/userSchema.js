import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  EmailAddress: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Tourist", "admin", "service", "analytic"],
    default: "Tourist",
  },
  Cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
});

const User = mongoose.model("User", Userschema);
export default User;