const Task = require("../models/TaskModel");
const User = require('../models/UserModel');

// Add task
module.exports.postTask = async (req, res) => {
    try {
        const userId = req.params.id;
        const { task } = req.body;

        // Check if task or userId is missing
        if (!task || !userId) {
            return res.status(400).json({ msg: "Missing information" });
        }

        // Check if the task already exists for the user
        const existingTask = await Task.findOne({ userId, task });
        if (existingTask) {
            return res.status(400).json({ msg: "Task already exists" });
        }

        // Creating a new task
        const newTask = new Task({ task, userId });
        await newTask.save();

        res.status(200).json({ task: newTask, msg: "Task created successfully" });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Update task
module.exports.updateTask = async (req, res) => {
    try {
        const updateTask = await Task.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        if (!updateTask) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json(updateTask);
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Delete task
module.exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json({ msg: `Task with ID ${req.params.id} has been deleted successfully` });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Get all tasks
module.exports.getTasks = async (req, res) => {
    let userId = req.params.id;
    try {
        let userTasks = await Task.find({ userId });
        res.status(200).json({userTasks})
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};
