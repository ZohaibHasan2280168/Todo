const Task = require('../models/taskModel');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.create({ title, description, completed });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get Task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { title, description, completed } = req.body;
    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.destroy();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
