const Resume = require("./models/Resume");

app.get("/confirm", async (req, res) => {
  try {
    const { resumeId, slot } = req.query;

    if (!resumeId || !slot) {
      return res.status(400).send("Invalid request");
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).send("Resume not found");
    }

    const selectedSlot = resume.availableSlots[slot - 1];

    if (!selectedSlot) {
      return res.status(400).send("Invalid slot selection");
    }

    resume.selectedSlot = selectedSlot;
    await resume.save();

    res.send(`
      <h2>Interview Confirmed ✅</h2>
      <p>Your interview is scheduled for:</p>
      <h3>${selectedSlot}</h3>
    `);

  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});