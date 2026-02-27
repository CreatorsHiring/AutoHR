const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobId: {
    type: String,
    required: true,
    trim: true,
  },
  originalFileName: {
    type: String,
    required: true,
    trim: true,
  },
  mimeType: {
    type: String,
    required: true,
    trim: true,
  },
  resumeData: {
    type: Buffer,
    required: true,
  },
  assignedHr: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HR",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  selectedSlot: {
    type: String,
  },
  availableSlots: [String],
});

module.exports = mongoose.model("Resume", resumeSchema);
