// backend/controllers/taskController.js
const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const User = require('../models/User'); // Needed to check user existence if necessary, though protect middleware handles most of it

// @desc    Get all tasks for the authenticated user
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  // req.user is populated by the protect middleware
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 }); // Sort by creation date, newest first
  res.status(200).json(tasks);
});

// @desc    Get a single task by ID for the authenticated user
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Make sure the logged-in user owns the task
  if (task.user.toString() !== req.user.id) {
    res.status(403); // Forbidden
    throw new Error('Not authorized to view this task');
  }

  res.status(200).json(task);
});

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please add a title for the task');
  }

  const task = await Task.create({
    user: req.user.id, // Associate task with the authenticated user
    title,
    description,
    status,
    priority,
    dueDate: dueDate ? new Date(dueDate) : undefined, // Convert to Date object if provided
  });

  res.status(201).json(task);
});

// @desc    Update an existing task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  const taskId = req.params.id;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Make sure the logged-in user owns the task
  if (task.user.toString() !== req.user.id) {
    res.status(403); // Forbidden
    throw new Error('Not authorized to update this task');
  }

  // Prepare update object, only include fields that are provided in the request body
  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (status !== undefined) updateFields.status = status;
  if (priority !== undefined) updateFields.priority = priority;
  if (dueDate !== undefined) updateFields.dueDate = dueDate ? new Date(dueDate) : null; // Set to null if dueDate is explicitly sent as null/empty

  const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, {
    new: true, // Return the updated document
    runValidators: true, // Run schema validators on update
  });

  res.status(200).json(updatedTask);
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  // Make sure the logged-in user owns the task
  if (task.user.toString() !== req.user.id) {
    res.status(403); // Forbidden
    throw new Error('Not authorized to delete this task');
  }

  await Task.deleteOne({ _id: req.params.id }); // Use deleteOne for clarity

  res.status(200).json({ message: 'Task removed successfully', id: req.params.id });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};