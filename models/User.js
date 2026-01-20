const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee"
  },
  department: {
    type: String,
    required: false
  },
  contact: {
    type: String,
    required: false
  }
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);