require("dotenv").config();
const nodemailer = require("nodemailer");
const { createEvent } = require("ics");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify SMTP connection
transporter.verify((err, success) => {
  if (err) {
    console.log("SMTP Error:", err);
  } else {
    console.log("SMTP Ready");
  }
});

async function sendInterviewEmail(candidateEmail, candidateName, hrName, resumeId) {
  const timeSlots = [
    "Monday 10:00 AM",
    "Monday 11:00 AM",
    "Monday 3:00 PM",
  ];

  const htmlContent = `
<div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:40px;">
  <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:12px; box-shadow:0 8px 30px rgba(0,0,0,0.08);">

    <h2 style="color:#1e293b;">Interview Invitation 🎉</h2>

    <p>Hi <strong>${candidateName}</strong>,</p>

    <p>Your resume has been shortlisted!</p>

    <p><strong>Assigned HR:</strong> ${hrName}</p>

    <p>Please choose a convenient time slot:</p>

   ${timeSlots.map((slot, i) => `
  <div style="margin-bottom:12px;">
    <a 
      href="http://localhost:3000/confirm?resumeId=${resumeId}&slot=${i+1}"
      style="
        display:block;
        padding:12px;
        background:#2563eb;
        color:#ffffff;
        text-align:center;
        border-radius:8px;
        text-decoration:none;
        font-weight:600;
      "
    >
      ${slot}
    </a>
  </div>
`).join("")}
    <div style="margin-top:20px;">
      <a href="http://localhost:3000/reschedule?resumeId=${resumeId}"
         style="
           display:block;
           padding:12px;
           background:#f1f5f9;
           color:#1e293b;
           text-align:center;
           border-radius:8px;
           text-decoration:none;
           font-weight:600;
         ">
         Choose Another Day
      </a>
    </div>

    <p style="margin-top:30px; font-size:12px; color:#64748b;">
      If none of the slots work, click “Choose Another Day” to request alternate availability.
    </p>

  </div>
</div>
`;

const event = {
  start: [2026, 3, 2, 10, 0], // Year, Month, Day, Hour, Minute
  duration: { hours: 1 },
  title: "HireOrbit Interview",
  description: "Technical Interview via HireOrbit",
  location: "Google Meet (Link shared separately)",
  organizer: { name: "HireOrbit", email: process.env.EMAIL_USER },
  attendees: [
    { name: candidateName, email: candidateEmail },
    { name: hrName, email: process.env.EMAIL_USER },
  ],
};

createEvent(event, (error, value) => {
  if (error) {
    console.log(error);
    return;
  }

  transporter.sendMail({
    from: `"HireOrbit" <${process.env.EMAIL_USER}>`,
    to: candidateEmail,
    subject: "Interview Confirmed – Calendar Invite",
    html: htmlContent,
    attachments: [
      {
        filename: "interview.ics",
        content: value,
      },
    ],
  });
});
}

module.exports = sendInterviewEmail;