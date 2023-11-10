import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide your username"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: [true, "email already exists"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    unique: false,
  },
});

export default mongoose.model("Admins", AdminSchema);
