const express = require("express");
const multer = require("multer");
const Resume = require("../models/Resume");
const assignHR = require("../utils/assignHR");
const User = require("../models/User");
const sendInterviewEmail = require("../utils/mailer");

const router = express.Router();

function isLoggedIn(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect("/login");
  }
  next();
}

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  },
});


// ================= APPLICATION DETAIL =================

router.get("/applications/:id", isLoggedIn, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.session.userId,
    })
      .populate("assignedHr")
      .populate("userId");

    if (!resume) {
      return res.status(404).send("Application not found");
    }

    res.render("application-detail", { resume });

  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});


// ================= STATIC JOB DATA =================

const staticJobs = [
  {
    id: "backend",
    title: "Backend Developer",
    location: "Remote",
    type: "Full-time",
    summary: "Build robust, scalable APIs and services for HireOrbit.",
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    summary: "Craft modern, responsive UIs for job seekers.",
  },
  {
    id: "fullstack",
    title: "Full Stack Engineer",
    location: "Hybrid · Bangalore",
    type: "Full-time",
    summary: "Own end-to-end features across frontend and backend.",
  },
];


// ================= JOB LIST =================

router.get("/jobs", async (req, res) => {
  res.render("jobs", { jobs: staticJobs });
});


// ================= APPLY PAGE =================

router.get("/jobs/:jobId/apply", isLoggedIn, async (req, res) => {
  const { jobId } = req.params;
  const job = staticJobs.find((j) => j.id === jobId);

  if (!job) {
    return res.status(404).send("Job not found");
  }

  res.render("apply", { job });
});


// ================= APPLY SUBMISSION =================

router.post(
  "/jobs/:jobId/apply",
  isLoggedIn,
  upload.single("resume"),
  async (req, res) => {
    try {
      const { jobId } = req.params;
      const job = staticJobs.find((j) => j.id === jobId);

      if (!job) {
        return res.status(404).send("Job not found");
      }

      if (!req.file) {
        return res.status(400).send("Resume file is required and must be a PDF.");
      }

      const assignedHr = await assignHR();

      const resume = new Resume({
        userId: req.session.userId,
        jobId: job.id,
        originalFileName: req.file.originalname,
        mimeType: req.file.mimetype,
        resumeData: req.file.buffer,
        assignedHr: assignedHr._id,
        status: "Pending",
        interviewStatus: "Not Scheduled",
      });

      const timeSlots = [
        "Monday 10:00 AM",
        "Monday 11:00 AM",
        "Monday 3:00 PM",
      ];

      resume.availableSlots = timeSlots;

      await resume.save();

      const user = await User.findById(req.session.userId);

      await sendInterviewEmail(
        user.email,
        user.name,
        assignedHr.name,
        resume._id
      );

      return res.redirect(`/applications/${resume._id}`);

    } catch (err) {
      console.log(err);
      return res.status(500).send("Something went wrong while submitting your application.");
    }
  }
);

module.exports = router;