import Project from "../models/Project.js";
import { validationResult } from "express-validator";

export const createProject = async (req, res) => {
  //check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //save project to db
  try {
    const project = new Project(req.body);
    project.owner = req.user.id;
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

export const getProjectsForActiveUser = async (req, res) => {
  //check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const projects = await Project.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

export const updateProject = async (req, res) => {
  //get newProject info
  const { name } = req.body;

  const newProject = {};
  if (name) {
    newProject.name = name;
  }
  //update
  try {
    //check id
    let project = await Project.findById(req.params.id);
    //checks if project exist
    if (!project) {
      res.status(404).json({ msg: "Project not found." });
    }
    //check project owner
    if (project.owner.toString() !== req.user.id) {
      res.status(401).json({ msg: "Not Autorized." });
    }
    //update
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: newProject,
      },
      { new: true }
    );
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    //get project id
    let project = await Project.findById(req.params.id);
    //checks if project exist
    if (!project) {
      res.status(404).json({ msg: "Project not found." });
    }
    //check project owner
    if (project.owner.toString() !== req.user.id) {
      res.status(401).json({ msg: "Not Autorized." });
    }
    await Project.findByIdAndDelete({ _id: req.params.id });
    res.json({ msg: "Project deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!" });
  }
};
