# AutoHR - Automated HR Recruitment System

AutoHR is a comprehensive web-based recruitment platform that automates the hiring process by connecting job candidates with HR representatives. The system streamlines resume collection, HR assignment, interview scheduling, and confirmation management.

## Features

- **User Authentication**: Secure login and registration system with bcrypt password hashing
- **Job Listings**: Browse available job positions with detailed descriptions
- **Resume Management**: Upload and store PDF resumes with file validation
- **Automated HR Assignment**: Intelligent assignment of candidates to available HR representatives
- **Interview Scheduling**: Schedule interview slots and manage availability
- **Email Notifications**: Automated email communications for interview confirmations and updates
- **Session Management**: Secure session handling with HTTP-only cookies
- **Responsive UI**: EJS-based templating for dynamic user interface

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: bcrypt for password hashing
- **Sessions**: express-session for session management
- **Email Service**: Nodemailer for sending emails
- **File Upload**: Multer for handling resume uploads
- **Frontend**: EJS templating engine with CSS styling
- **Utilities**: Method-override for HTTP method tunneling

## Project Structure

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

## Installation

1. Clone or extract the project:
```bash
cd AutoHR
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your configuration:
```env
SESSION_SECRET=your_session_secret_key
MONGODB_URI=your_mongodb_connection_string
NODEMAILER_SERVICE=your_email_service
NODEMAILER_EMAIL=your_email@example.com
NODEMAILER_PASSWORD=your_email_password
```

4. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000` (default port).

## Key Models

### User
Stores candidate and HR representative information with authentication details.

### Resume
Manages uploaded resume documents with file storage and metadata.

### HR
Tracks HR representatives and their interview slot availability.

## Main Routes

- **Job Management**: List jobs, view details, and apply
- **Authentication**: User registration and login
- **Applications**: Submit resumes for job positions
- **Interview Scheduling**: Schedule and confirm interview slots
- **Confirmation**: Verify and confirm interview attendance

## Security Features

- **Password Security**: Bcrypt hashing for password storage
- **Session Protection**: HTTP-only cookies to prevent XSS attacks
- **File Validation**: PDF-only resume uploads with size limits
- **Method Override**: Safe HTTP method tunneling for REST operations

## Dependencies

- `express` - Web application framework
- `mongoose` - MongoDB object modeling
- `bcrypt` - Password hashing
- `express-session` - Session management
- `nodemailer` - Email service
- `multer` - File upload handling
- `ejs` - Template engine
- `method-override` - HTTP method override
- `dotenv` - Environment variable management

## Environment Setup

Ensure your MongoDB instance is running and accessible. Update the connection string in your environment variables or the code.

## Getting Started

1. Register a new account
2. Browse available job positions
3. Upload your resume as a PDF
4. Complete the job application
5. Receive interview scheduling details via email
6. Confirm your interview attendance
7. Wait for HR contact and interview

## Future Enhancements

- Interview video conferencing integration
- Candidate skill assessment tests
- Analytics and reporting dashboard
- Interview feedback system
- Automated rejection emails
- Resume screening AI integration

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please contact the development team.
