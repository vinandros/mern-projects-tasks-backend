import Task from "../models/Task.js";
import Project from "../models/Project.js";
import { validationResult } from "express-validator";

export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ msg: "Project not Found!" });
    }

    //check project owner
    if (project.owner.toString() !== req.user.id) {
      res.status(401).json({ msg: "Not Autorized." });
    }

    //create task
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

export const getTaskFromProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const { projectId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      res.status(404).json({ msg: "Project not Found!" });
    }

    //check project owner
    if (project.owner.toString() !== req.user.id) {
      res.status(401).json({ msg: "Not Autorized." });
    }

    const tasks = await Task.find({ projectId });
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

export const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const { projectId, name, state } = req.body;
    //check project owner and authorization
    const project = await Project.findById(projectId);
    if (project.owner.toString() !== req.user.id) {
      res.status(401).json({ msg: "Not Autorized." });
    }

    // check if task exist
    let task = Task.findById({ _id: req.params.id });
    if (!task) {
      res.status(404).json({ msg: "Task not found." });
    }
    //update task
    const newTask = {};
    if (name) {
      newTask.name = name;
    }
    if (state) {
      newTask.state = state;
    }

    //save new task
    task = await Task.findByIdAndUpdate(req.params.id, newTask, {
      new: true,
    });
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

export const deleteTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  try {
    const { projectId } = req.body;
    //check project owner and authorization
    const project = await Project.findById(projectId);
    if (project.owner.toString() !== req.user.id) {
      res.status(401).json({ msg: "Not Autorized." });
    }

    // check if task exist
    let task = Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ msg: "Task not found." });
    }

    //save new task
    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
