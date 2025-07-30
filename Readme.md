Task Management Application
===========================

Welcome to the Task Management Application! This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to help users manage their tasks efficiently. It includes user authentication, task creation/management, and a fun spin wheel feature to pick tasks.

Table of Contents
-----------------

*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Frontend (React)](#frontend-react)
    *   [Key Features](#frontend-key-features)
    *   [Technologies](#frontend-technologies)
    *   [Local Setup](#frontend-local-setup)
    *   [Deployment](#frontend-deployment)
    *   [Environment Variables](#frontend-environment-variables)
*   [Backend (Node.js/Express)](#backend-nodejs-express)
    *   [Key Features](#backend-key-features)
    *   [Technologies](#backend-technologies)
    *   [Local Setup](#backend-local-setup)
    *   [Deployment](#backend-deployment)
    *   [Environment Variables](#backend-environment-variables)
*   [Running Both Locally](#running-both-locally)
*   [Important Notes](#important-notes)
*   [Contact](#contact)

Features
--------

*   **User Authentication:** Register, Login, Logout.
*   **Password Reset:** Forgot password and reset password functionality via email.
*   **Task Management:** Create, Read, Update, Delete tasks.
*   **Task Status & Priority:** Categorize tasks by status (To Do, In Progress, Done) and priority (Low, Medium, High).
*   **Task Filtering:** Filter tasks by category and status on the dashboard.
*   **Task Details:** View detailed information for each task.
*   **Spin Wheel:** A fun feature to randomly select a task from your "To Do" or "In Progress" list.
*   **Responsive Design:** Optimized for various screen sizes (mobile, tablet, desktop).
*   **Interactive Modals:** Custom modals for confirmations and success messages.

Technologies Used
-----------------

This project leverages the following core technologies:

*   **Frontend:** React.js
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB (via Mongoose ODM)
*   **Deployment:** Vercel (Backend), Netlify (Frontend)

Frontend (React)
----------------

The frontend is a Single Page Application (SPA) built with React, providing a dynamic and responsive user interface.

Live Link: https://relaxed-sherbet-4a4dff.netlify.app/

### Key Features

*   Intuitive Dashboard to view and manage tasks.
*   Modal forms for creating and editing tasks.
*   Task cards displaying status, priority, and due dates.
*   Integration with the backend API for all data operations.
*   Client-side routing with `react-router-dom`.
*   Spin wheel animation and task selection.

### Technologies

*   React.js
*   React Router DOM
*   Axios for API requests
*   React Icons (for delete/edit icons)
*   Custom CSS for styling and responsiveness

### Local Setup

To run the frontend locally:

1.  Navigate to the `task-management-frontend` directory:
    
        cd task-management-frontend
        
    
2.  Install the dependencies:
    
        npm install
        
    
3.  Start the development server:
    
        npm start
        
    
    The application will typically open in your browser at `http://localhost:3000`.
    

### Deployment

The frontend is deployed as a static site on **Netlify**.

*   **SPA Refresh Fix:** A `_redirects` file is included in the `public` folder with the rule `/* /index.html 200` to ensure client-side routes work correctly on refresh.
*   **Vercel Configuration (`task-management-frontend/vercel.json`):**
    
        {
          "version": 2,
          "builds": [
            {
              "src": "package.json",
              "use": "@vercel/static-build",
              "config": {
                "distDir": "build"
              }
            }
          ],
          "routes": [
            {
              "src": "/(.*)",
              "dest": "/$1"
            }
          ]
        }
        
    

### Environment Variables (Frontend)

Create a `.env` file in the `task-management-frontend/` directory for local development, and set these in Netlify's build environment variables for deployment.

*   `REACT_APP_API_BASE_URL`: The URL of your deployed backend API (e.g., `https://task-management-app-backend-theta.vercel.app/api`).

Backend (Node.js/Express)
-------------------------

The backend is a RESTful API built with Node.js and Express.js, handling all data operations and user authentication.

### Key Features

*   User registration and login with JWT authentication.
*   Secure password hashing (bcryptjs).
*   Password reset functionality with email sending (Nodemailer).
*   CRUD operations for tasks.
*   Middleware for authentication, error handling, and validation.
*   CORS configuration for secure cross-origin requests.

### Technologies

*   Node.js
*   Express.js
*   MongoDB (Mongoose)
*   JSON Web Tokens (JWT)
*   Bcryptjs
*   Nodemailer (for email sending)
*   Helmet (for security headers)
*   CORS
*   Dotenv

### Local Setup

To run the backend locally:

1.  Navigate to the `task-management-app-backend` directory:
    
        cd task-management-app-backend
        
    
2.  Install the dependencies:
    
        npm install
        
    
3.  Create a `.env` file in this directory (see [Environment Variables (Backend)](#backend-environment-variables) below).
4.  Start the development server:
    
        npm start # Or npm run dev if you have a dev script
        
    
    The API will typically run on `http://localhost:5000`.
    

### Deployment

The backend is deployed as serverless functions on **Vercel**.

*   **Entry Point:** The `server.js` file is exported and used as the entry point via `api/index.js` for Vercel's serverless functions.
*   **CORS:** Configured to allow requests from the deployed frontend URL.
*   **Vercel Configuration (`task-management-app-backend/vercel.json`):**
    
        {
          "version": 2,
          "builds": [
            {
              "src": "api/index.js",
              "use": "@vercel/node",
              "config": {
                "includeFiles": [
                  "models/**",
                  "controllers/**",
                  "routes/**",
                  "middleware/**",
                  "config/**",
                  "utils/**",
                  "server.js",
                  "package.json",
                  "package-lock.json"
                ]
              }
            }
            ],
            "routes": [
              {
                "src": "/(.*)",
                "dest": "/api/index.js"
              }
            ]
        }
        
    

### Environment Variables (Backend)

Create a `.env` file in the `task-management-app-backend/` directory for local development, and set these in Vercel's environment variables for deployment.

*   `PORT`: (e.g., `5000`) - For local development. Vercel ignores this.
*   `MONGO_URI`: Your MongoDB Atlas connection string.
*   `JWT_SECRET`: A strong, random string for JWT signing.
*   `JWT_EXPIRES_IN`: (e.g., `1h` for 1 hour)
*   `FRONTEND_URL`: The URL of your deployed frontend (e.g., `https://relaxed-sherbet-4a4dff.netlify.app`). This is crucial for CORS.

Running Both Locally
--------------------

To run the entire application locally:

1.  **Start the Backend:**
    *   Open a terminal and navigate to `task-management-app-backend/`.
    *   Run `npm install` (if not already done).
    *   Run `npm start` (or `npm run dev`).
2.  **Start the Frontend:**
    *   Open a **separate** terminal and navigate to `task-management-frontend/`.
    *   Run `npm install` (if not already done).
    *   Run `npm start`.

Your application should now be fully operational locally, with the frontend communicating with the backend.

Important Notes
---------------

*   **Environment Variables:** Always keep your sensitive information (like `MONGO_URI`, `JWT_SECRET`, `EMAIL_PASS`) in environment variables and never commit them directly to your Git repository.
*   **CORS:** Ensure your `FRONTEND_URL` in the backend's Vercel environment variables is updated to match your Netlify frontend URL after deployment, and redeploy the backend.
*   **MongoDB Atlas:** For production, use a cloud-hosted MongoDB solution like MongoDB Atlas.
*   **Email Service:** For production email sending, consider robust services like SendGrid, Mailgun, or AWS SES. Mailtrap is excellent for development testing.

Contact
-------

For any questions or feedback, please reach out to:

*   **Your Name:** Mahadi Zulfiker
*   **Email:** \[mahade.adib45@gmail.com\]