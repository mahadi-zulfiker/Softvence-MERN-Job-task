// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the User model
    },
    title: {
      type: String,
      required: [true, 'Please add a title for the task'],
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: false, // Description is optional
      trim: true,
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
      required: false, // Due date is optional
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;