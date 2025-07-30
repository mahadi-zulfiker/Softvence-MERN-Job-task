// task-management-app-backend/server.js
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // Still useful for local dev

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Security Middleware
app.use(helmet());

// CORS Configuration - CRUCIAL FOR DEPLOYMENT!
const allowedOrigins = [
  'http://localhost:3000', // Allow your local frontend for testing
  process.env.FRONTEND_URL // THIS IS KEY: Will be the URL of your deployed Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // Or if the origin is in our allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // Block requests from unauthorized origins
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Ensure all methods you use are allowed
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  credentials: true, // Allow sending cookies/auth headers if you use them
}));

// Routes
app.get('/api', (req, res) => { // Using /api to match common API routing pattern
  res.send('Backend API is running...');
});

app.get('/', (req, res) => { // Using /api to match common API routing pattern
  res.send('Backend API is running... in /api path');
});

app.get('/api/health', (req, res) => { // Using /api/health for a health check endpoint
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 404 Not Found Handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Custom Error Handler (must be last middleware)
app.use(errorHandler);

// EXPORT THE APP FOR VERCEL
module.exports = app;

// Conditional app.listen() for local development only
// Vercel handles starting the server for serverless functions
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL_ENV === 'development') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}