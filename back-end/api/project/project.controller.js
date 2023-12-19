import { Project } from "../../models/index.js";

async function createProject(req, res) {
  try {
    const projectData = req.body;
    console.log(projectData);
    const project = await Project.create(projectData);

    res.status(200).json({
      message: "Project successfully created",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating the project",
    });
  }
}

async function getProjects(req, res) {
  try {
    const projects = await Project.findAll();

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching the projects",
    });
  }
}

export { createProject, getProjects };
