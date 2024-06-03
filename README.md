Overview
This project is a job application system developed using the MERN stack (MongoDB, Express.js, React, Node.js). It was created as part of a software design course and follows a 3-tier architecture with the Singleton design pattern.

Features
Add New Job Postings: Admins can create and manage job listings.
Apply for Jobs: Users can apply for available job postings.
Job Application Tracking: View the number of jobs applied for and application history.
Company Listings: Browse and search through various companies.
Job Search: Users can search for jobs based on various criteria.
Authentication and Authorization: Secure login system with two roles:
User: Access to job search, application, and personal job history.
Admin: Access to admin dashboard for managing job postings and applications.
Dashboards: Separate dashboards for users and admins.
Architecture
3-Tier Architecture: The system is divided into presentation, application, and data tiers for better separation of concerns and scalability.
Singleton Design Pattern: Used to ensure a single instance of certain classes to control access to shared resources.
Tech Stack
MongoDB: Database for storing job postings, user information, and application data.
Express.js: Backend framework for building the server and API endpoints.
React: Frontend library for building user interfaces.
Node.js: JavaScript runtime for the server environment.
Installation
Clone the repository.
Navigate to the project directory.
Install the dependencies for both frontend and backend using npm install.
Set up environment variables for database connections and other configurations.
Run the backend server with npm run server.
Run the frontend development server with npm start.
Usage
Admin: Log in to access the admin dashboard to manage job postings and view applications.
User: Create an account or log in to apply for jobs, track applications, and view job history.
Contribution
Feel free to contribute to this project by opening issues and submitting pull requests.

License
This project is licensed under the MIT License.   
