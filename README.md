🚀 AutoHR – AI-Powered Interview Scheduling & Recruitment Automation System

AutoHR is an intelligent recruitment automation platform that eliminates manual interview coordination by using AI resume scoring and automated calendar-based scheduling.

The system connects candidates and recruiters through a fully automated pipeline — from resume submission to confirmed interview meeting link — without manual back-and-forth.

🌟 Core USP

AutoHR eliminates recruiter back-and-forth by using AI-powered resume scoring and automated calendar scheduling to instantly assign HR, detect availability, and confirm interviews with meeting links.

🧠 AI & Automation Capabilities

AutoHR integrates modern AI and automation tools:

🔹 OpenAI Integration

AI-based resume scoring and candidate evaluation

Semantic analysis of resumes against job requirements

Automated shortlisting support

Intelligent ranking of candidates

🔹 Calendar API Integration

Real-time HR availability checking

Conflict detection before slot confirmation

Automated event creation upon confirmation

Calendar invite delivery to candidates and HR

This transforms AutoHR from a job portal into an intelligent scheduling agent.

⚙️ Key Features
🔐 Authentication & Security

Secure registration & login

Bcrypt password hashing

Session management with HTTP-only cookies

📄 Resume Management

PDF resume upload with validation

Resume stored in MongoDB (binary buffer)

AI-based resume scoring using OpenAI API

🤖 Intelligent HR Assignment

Automatic HR allocation based on:

Least workload

Availability

Active status

📅 Automated Interview Scheduling

Dynamic time slot generation

Conflict detection system

Calendar event creation via Calendar API

Automated meeting link generation

Reschedule workflow

📧 Email Automation

Slot selection email

Confirmation email

Calendar invite (.ics support)

Meeting link distribution

📊 Application Tracking

Real-time application status

Interview status updates

Assigned HR visibility

Meeting link display

🏗️ System Architecture Overview
```
Candidate Dashboard (EJS Frontend)
           │
           ▼
Express.js Backend (Agent Layer)
           │
 ┌─────────┼───────────┬─────────────┐
 ▼         ▼           ▼             ▼
MongoDB   OpenAI API  Calendar API  Nodemailer
(Data)    (AI Score)  (Scheduling)  (Emails)
```
🛠 Technology Stack
Backend

Node.js

Express.js

Database

MongoDB

Mongoose ODM

AI / ML

OpenAI API (Resume Scoring & Semantic Matching)

Scheduling

Google Calendar API (Event creation & availability checks)

Email System

Nodemailer (SMTP)

ICS Calendar Invites

Authentication & Security

bcrypt

express-session

dotenv

File Handling

Multer (PDF uploads)

Frontend

EJS Templating

Tailwind CSS / Custom CSS

📂 Project Structure
```
AutoHR/
├── index.js                 # Main application entry point
├── package.json            # Project dependencies
├── models/                 # Mongoose schemas
│   ├── User.js            # User model (candidates & HR)
│   ├── Resume.js          # Resume model
│   └── HR.js              # HR representative model
├── routes/                # API routes
│   ├── jobs.js            # Job listing and application routes
│   ├── interview.js       # Interview scheduling routes
│   └── auth.js            # Authentication routes
├── utils/                 # Utility functions
│   ├── assignHR.js        # HR assignment logic
│   └── mailer.js          # Email notification service
├── views/                 # EJS templates
│   ├── landing.ejs        # Home page
│   ├── login.ejs          # Login page
│   ├── register.ejs       # Registration page
│   ├── jobs.ejs           # Job listings page
│   ├── apply.ejs          # Job application form
│   ├── confirm-success.ejs # Success confirmation
│   └── confirm-error.ejs  # Error confirmation
├── public/                # Static files
│   └── css/
│       └── styles.css     # Application styles
└── init/                  # Database initialization
    ├── data.js            # Sample data
    └── dataindex.js       # Data seeding script
```
🔄 End-to-End Workflow

Candidate registers and logs in

Candidate applies to a job and uploads resume

Resume stored in MongoDB

OpenAI API scores the resume

HR auto-assigned based on least load

Available time slots generated

Email sent to candidate with selectable slots

Candidate confirms slot

Calendar event created via Calendar API

Meeting link generated and shared

Interview officially scheduled

Fully automated. No manual coordination required.

🔐 Security Features

Password hashing with bcrypt

File validation (PDF only)

Session protection (HTTP-only cookies)

Conflict detection before scheduling

Duplicate confirmation protection

Slot locking mechanism

📦 Installation
1️⃣ Install dependencies
npm install
2️⃣ Create .env file
SESSION_SECRET=your_secret
MONGODB_URI=mongodb://127.0.0.1:27017/AutoHR
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
OPENAI_API_KEY=your_openai_key
GOOGLE_CALENDAR_CLIENT_ID=your_client_id
GOOGLE_CALENDAR_CLIENT_SECRET=your_secret
GOOGLE_CALENDAR_REDIRECT_URI=your_redirect
3️⃣ Start server
npm start

App runs at:

http://localhost:3000
🎯 Key Objectives & Implementation
✔ Automate Interview Scheduling

AI-driven resume scoring

Automatic HR assignment

Slot generation & conflict detection

Calendar API integration

✔ Reduce Recruiter Administrative Workload

No manual slot negotiation

No manual email coordination

Automatic event creation

Automated reminders

✔ Improve Candidate Experience

One-click scheduling

Instant confirmation

Meeting link delivered automatically

Application tracking dashboard

✔ Eliminate Scheduling Conflicts

Real-time availability checking

Double-booking prevention

Slot locking mechanism

🚀 Future Enhancements

AI-powered candidate-job semantic matching

Interview performance analytics

Automated rejection email flow

Recruiter dashboard with load analytics

Multi-company SaaS version

SMS reminders
