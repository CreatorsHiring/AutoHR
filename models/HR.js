const mongoose = require("mongoose");

const hrSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  skills: [
    {
      type: String,
      trim: true,
    },
  ],
  currentLoad: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("HR", hrSchema);

