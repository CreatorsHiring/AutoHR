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
  status: {
  type: String,
  enum: ["Pending", "Shortlisted", "Rejected"],
  default: "Pending",
  },
  interviewStatus: {
    type: String,
    enum: ["Not Scheduled", "Scheduled", "Completed"],
    default: "Not Scheduled",
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
