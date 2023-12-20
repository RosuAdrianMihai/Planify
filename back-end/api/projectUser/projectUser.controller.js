import { ProjectUser } from "./../../models/index.js";
import { Project } from "./../../models/index.js";

async function addProjectMember(req, res) {
  try {
    const { projectId } = req.params;
    const memberData = req.body;

    const foundMember = await ProjectUser.findOne({
      where: {
        ProjectId: projectId,
        UserId: memberData.userId,
      },
    });

    if (foundMember) {
      return res.status(200).json({
        message: "The user is already in the project",
      });
    }

    await ProjectUser.create({
      ProjectId: projectId,
      UserId: memberData.userId,
      managerId: memberData.managerId,
    });

    res.status(200).json({
      message: "User was successfully added to the project",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding the user to the project",
    });
  }
}

async function getProjectsMember(req, res) {
  try {
    const user = req.body;

    console.log(user);

    let projects = [];

    if (user.position === "admin") {
      projects = await Project.findAll();
      return res.status(200).json(projects);
    }

    const userProjects = await ProjectUser.findAll({
      where: {
        UserId: user.id,
      },
    });

    for (const userProject of userProjects) {
      const project = await Project.findByPk(userProject.ProjectId);
      projects.push(project);
    }

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: "Error getting the user projects",
    });
  }
}

export { addProjectMember, getProjectsMember };
