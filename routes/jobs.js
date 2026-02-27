const express = require("express");
const multer = require("multer");
const Resume = require("../models/Resume");
const HR = require("../models/HR");

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

router.get("/jobs", async (req, res) => {
  res.render("jobs", { jobs: staticJobs });
});

router.get("/jobs/:jobId/apply", isLoggedIn, async (req, res) => {
  const { jobId } = req.params;
  const job = staticJobs.find((j) => j.id === jobId);
  if (!job) {
    return res.status(404).send("Job not found");
  }

  res.render("apply", { job });
});

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

      const activeHrs = await HR.find({ isActive: true }).sort({ currentLoad: 1 });
      if (!activeHrs || activeHrs.length === 0) {
        return res.status(500).send("No active HR available for assignment.");
      }

      const assignedHr = activeHrs[0];
      assignedHr.currentLoad += 1;
      await assignedHr.save();

      const resume = new Resume({
        userId: req.session.userId,
        jobId: job.id,
        originalFileName: req.file.originalname,
        mimeType: req.file.mimetype,
        resumeData: req.file.buffer,
        assignedHr: assignedHr._id,
      });

      await resume.save();

      return res.redirect("/jobs");
    } catch (err) {
      return res
        .status(500)
        .send("Something went wrong while submitting your application.");
    }
  }
);

module.exports = router;

