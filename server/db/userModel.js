import mongoose from "mongoose";

const Schema = mongoose.Schema;

// const ImageSchema = new Schema({
//   url: String,
//   filename: String,
// });

const milliseconds = Date.now();
const format = new Date(milliseconds);

const year = format.getYear() + 1900;
const month = format.getMonth() + 1;
const date = format.getDate();

const registeredDate = year + "-" + month + "-" + date;
console.log(registeredDate);

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please enter your full name"],
  },
  dob: {
    type: Date,
    required: [true, "Please enter your date of birth"],
  },

  gender: {
    type: String,
    required: [true, "Please enter your gender"],
  },
  streetAddress: {
    type: String,
    required: [true, "Please enter your address"],
  },
  city: {
    type: String,
    required: [true, "Please enter your city"],
  },
  zipCode: {
    type: Number,
    required: [true, "Please enter your zip code"],
  },
  profilePicture: {
    url: String,
    filename: String,
  },
  registeredDate: {
    type: String,
    default: registeredDate,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your phone number"],
  },

  notes: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },

  role: String,
});

export default mongoose.model("Users", UserSchema);
