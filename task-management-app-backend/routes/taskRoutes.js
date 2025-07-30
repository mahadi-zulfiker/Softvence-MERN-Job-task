// backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Routes that apply to all tasks (GET all, POST new)
router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

// Routes that apply to a specific task by ID (GET by ID, PUT update, DELETE)
router.route('/:id')
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;