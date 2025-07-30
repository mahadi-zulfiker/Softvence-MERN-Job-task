
const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');
const User = require('../models/User');


const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(tasks);
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to view this task');
  }

  res.status(200).json(task);
});

const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  if (!title) {
    res.status(400);
    throw new Error('Please add a title for the task');
  }

  const task = await Task.create({
    user: req.user.id,
    title,
    description,
    status,
    priority,
    dueDate: dueDate ? new Date(dueDate) : undefined,
  });

  res.status(201).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;
  const taskId = req.params.id;

  const task = await Task.findById(taskId);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to update this task');
  }

  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (status !== undefined) updateFields.status = status;
  if (priority !== undefined) updateFields.priority = priority;
  if (dueDate !== undefined) updateFields.dueDate = dueDate ? new Date(dueDate) : null;

  const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.user.toString() !== req.user.id) {
    res.status(403);
    throw new Error('Not authorized to delete this task');
  }

  await Task.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: 'Task removed successfully', id: req.params.id });
});

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};