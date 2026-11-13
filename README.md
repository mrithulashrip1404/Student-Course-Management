
 Student Course Management and Learning Progress Tracking System

 1. Project Overview

The Student Course Management and Learning Progress Tracking System is a full-stack web application designed to simplify academic course management and student learning activities.

It enables students to register, log in, explore available courses, enroll in courses, access lessons, track their learning progress, and generate course completion certificates. Administrators can manage learning content and monitor student-related information through a centralized platform.

The application provides an organized environment for managing academic activities, tracking learning progress, and supporting communication between students.

 2. Problem Statement

Managing academic courses and student records through manual methods can be time-consuming and prone to errors. Tracking student enrollment, course details, lesson completion, and learning progress separately can also make academic administration difficult.

This project provides a centralized platform that simplifies student authentication, course enrollment, lesson management, learning progress tracking, and communication, making academic activities more organized and efficient.

 3. Key Features

 User Authentication
- Student registration and login.
- Administrator login.
- JWT-based authentication.
- Password hashing using bcryptjs.
- Protected routes and role-based access.

 Course and Enrollment
- Browse available courses.
- View course information.
- Enroll in available courses.
- Access enrolled course content.

 Lesson Management
- Create, view, update, and delete lessons through the administrator interface.
- Organize lessons under courses.
- Provide lesson descriptions and learning content.
- Track student lesson completion.

 Learning Progress Tracking
- Monitor completed lessons.
- Calculate course completion percentages.
- Display learning progress on the student dashboard.
- Identify completed courses.

 Certificate Generation
- Generate PDF certificates after course completion.
- Include student and course information.
- Provide a unique certificate identification number.

 Personalized Dashboards
- Separate student and administrator dashboards.
- Display relevant course and student information.
- Provide access to available application features.

 Real-Time Chat and Notifications
- Instant messaging between students.
- Real-time message delivery using Socket.IO.
- Automatic notifications when new messages arrive.
- Online and offline connection status.
- JWT-based socket authentication.

 Secure Data Management
- JWT authentication.
- Password hashing.
- Input validation.
- Protected API endpoints.
- MongoDB data storage.

 4. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, JavaScript, React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JSON Web Token (JWT), bcryptjs |
| Real-Time Communication | Socket.IO |
| API Communication | Axios, REST API |
| PDF Generation | PDF generation library |
| Version Control | Git and GitHub |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

 5. System Modules

 Module 1 – User Authentication

Manages student registration, login, administrator authentication, and secure access.

Features:
- Student registration and login.
- Administrator login.
- Password hashing using bcryptjs.
- JWT-based authentication.
- Protected routes and role-based access.

 Module 2 – Course Management

Provides access to available course information.

Features:
- Display available courses.
- View course details.
- Access course-related information.
- Support student course enrollment.

 Module 3 – Course Enrollment

Supports student access to available courses and enrollment activities.

Features:
- Browse available courses.
- View course information.
- Enroll in available courses.
- Access enrolled course content.

 Module 4 – Lesson Management

Allows administrators to manage lessons associated with courses.

Features:
- Create new lessons.
- View existing lessons.
- Update lesson details.
- Delete lessons.
- Organize learning content under courses.

 Module 5 – Learning Progress Tracking

Focuses on monitoring student learning progress.

Features:
- Track lesson completion.
- Calculate course completion percentages.
- Display completed lessons.
- Identify completed courses.
- Maintain student learning progress.

 Module 6 – Certificate Generation

Provides course completion certificates for students.

Features:
- Generate PDF certificates.
- Display student name and course name.
- Include course completion date.
- Generate a unique certificate ID.

 Module 7 – Dashboard

Provides separate dashboard interfaces for students and administrators.

Features:
- Student dashboard.
- Administrator dashboard.
- Display relevant course information.
- Display student learning progress.
- Provide access to available application features.

 Module 8 – Notifications

Keeps users informed about relevant application activities.

Features:
- Display notifications.
- Notify users when new messages arrive.
- Support real-time notification updates.

 Module 9 – Real-Time Chat

Implements real-time communication between students using Socket.IO.

Features:
- Instant messaging between students.
- Real-time message delivery without page refresh.
- JWT-based socket authentication.
- Online and offline connection status.
- Store messages and notifications in MongoDB.

Technology Used:
- Socket.IO – Backend.
- Socket.IO Client – Frontend.
- MongoDB – Message and notification storage.

 6. Database Management

The application uses MongoDB to store and manage application data.

Database-related operations include:
- User and student information.
- Course information.
- Lesson information.
- Student enrollment records.
- Learning progress and completion records.
- Chat messages.
- Notifications.

Mongoose is used for database models, schema definitions, validation, and database operations.

 7. Security, Validation and Error Handling

The application includes security and validation mechanisms to protect user information and maintain reliable API operations.

 Security Features
- Password hashing using bcryptjs.
- JWT-based authentication with token expiry.
- Role-based authorization.
- Protected API routes.
- Restricted CORS access to approved frontend origins.
- Secure handling of authentication tokens.

 Validation Features
- Registration input validation.
- Email format validation.
- Password length validation.
- Login input validation.
- Course and lesson input validation.

 Error Handling
- Centralized Express error-handling middleware.
- Handling of duplicate database records.
- Handling of database validation errors.
- Handling of invalid IDs and data formats.
- Appropriate HTTP status codes.
- Safe production error messages.

 8. Testing

The application has been tested through API requests and frontend integration.

 Testing Activities
- Student registration and login.
- Administrator authentication.
- Student enrollment.
- Lesson creation, retrieval, updating, and deletion.
- Lesson completion and progress tracking.
- Course completion certificate generation.
- Student profile retrieval and updating.
- Input validation for registration and login.
- JWT-protected API access.
- Real-time messaging between two student accounts.
- Automatic notification delivery.
- Frontend and backend connectivity.
- Production API connectivity.
- Socket.IO polling and WebSocket connection.
- Mobile responsiveness testing.

 Deployment Verification
- Frontend deployment tested on Vercel.
- Backend deployment tested on Render.
- Backend health endpoint verified.
- Production API requests returned successful HTTP responses.
- Socket.IO polling and WebSocket upgrade verified.

 9. Installation and Setup

 Prerequisites

Install the following before running the application:

- Node.js and npm.
- MongoDB database (local or MongoDB Atlas).
- Git.
- Visual Studio Code (recommended).

 Step 1 – Clone the Repository

```bash
git clone https://github.com/mrithulashrip1404/Student-Course-Management.git
cd Student-Course-Management
```

 Step 2 – Backend Setup

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory and configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

Use your own database connection string and credentials. Do not commit the `.env` file to GitHub.

Start the backend development server:

```bash
npm run dev
```

The backend runs locally at:

```text
http://localhost:5000
```

 Step 3 – Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend/frontend-react
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run at the local Vite development URL displayed in the terminal.

 10. Environment Variables

 Backend Environment Variables

| Variable | Description |
|---|---|
| PORT | Backend server port |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret used for JWT signing |
| ADMIN_EMAIL | Administrator email |
| ADMIN_PASSWORD | Administrator password |

 Frontend Environment Variables

| Variable | Description |
|---|---|
| VITE_API_URL | Backend REST API base URL |
| VITE_SOCKET_URL | Backend Socket.IO server URL |

Security Note: Never store passwords, database credentials, or JWT secrets in frontend environment variables. Variables prefixed with VITE_ are exposed to the browser.

 11. Live Deployment

The application is deployed using Vercel and Render.

 Frontend – Vercel

Live Application:

https://student-course-management-opal.vercel.app

 Backend – Render

Backend URL:

https://student-course-management-backend-foso.onrender.com

Health Check:

https://student-course-management-backend-foso.onrender.com/api/health

 Deployment Configuration

- Frontend is hosted on Vercel.
- Backend is hosted on Render.
- MongoDB is used for persistent database storage.
- Frontend communicates with the backend through REST APIs.
- Socket.IO provides real-time communication.
- Production environment variables are configured through the deployment platforms.

 12. Version Control

Git and GitHub are used to manage the project source code and maintain development history.

GitHub Repository:

https://github.com/mrithulashrip1404/Student-Course-Management

The repository contains the frontend and backend source code, project configuration, and documentation.

 13. Future Scope

The application can be extended with additional features to improve the learning experience and administrative efficiency.

- AI-based course recommendations.
- Online assessments and quizzes.
- Email notifications.
- Advanced learning progress analytics.
- Detailed student performance reports.
- Additional learning materials and resources.
- Enhanced administrative reporting.

These enhancements can make the platform more interactive, scalable, and beneficial for students and administrators.

 14. Conclusion

The Student Course Management and Learning Progress Tracking System provides a centralized platform for managing academic courses, student information, lesson activities, learning progress, and communication.

By integrating React.js, Node.js, Express.js, MongoDB, secure authentication, REST APIs, and real-time communication, the project demonstrates the development and deployment of a full-stack web application.

The system supports student enrollment, lesson completion, progress monitoring, certificate generation, and real-time messaging, providing an organized digital environment for academic learning and management.
