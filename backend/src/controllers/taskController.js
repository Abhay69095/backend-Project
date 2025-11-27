const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ userId: req.user.sub }).sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title required' });
    
    const task = new Task({
      userId: req.user.sub,
      title,
      description: description || ''
    });
    await task.save();
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (task.userId.toString() !== req.user.sub.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.updatedAt = new Date();
    await task.save();
    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (task.userId.toString() !== req.user.sub.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    
    await Task.deleteOne({ _id: id });
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

exports.completeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    if (task.userId.toString() !== req.user.sub.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
    
    task.completed = true;
    task.updatedAt = new Date();
    await task.save();
    res.json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
};
