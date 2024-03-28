const mongoose = require('mongoose')

//User
const userSchema = new mongoose.Schema({
    first_name: {
      type: String
    },
    last_name: {
      type: String
    },
    role: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true
    },
    phone_number: {
      type: String
    },
    created_at: {
      type: Date,
      default: Date.now
    }
});

const otpSchema = new mongoose.Schema({
    email: {
      type: String
    },
    otp: {
      type: String,
      required:true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });

const UserModel = new mongoose.model("users", userSchema)
const otpModel = new mongoose.model("temp_otps", otpSchema)

module.exports = {
    UserModel,
    otpModel
};