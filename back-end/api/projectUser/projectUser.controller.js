import {
  ProjectUser,
  Project,
  Task,
  TaskUser,
  User,
} from "./../../models/index.js";

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
      return res.status(500).json({
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

async function getProjectManagers(req, res) {
  try {
    const { projectId } = req.params;

    let managers = [];

    const projectManagers = await ProjectUser.findAll({
      where: {
        ProjectId: projectId,
        managerId: null,
      },
    });

    for (const manager of projectManagers) {
      const userManager = await User.findByPk(manager.UserId);
      managers.push(userManager);
    }

    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({
      message: "Error getting the project managers",
    });
  }
}

async function getProjectManagerTeam(req, res) {
  try {
    const { projectId, managerId } = req.params;

    const team = [];

    const teamMembers = await ProjectUser.findAll({
      where: {
        managerId,
        ProjectId: projectId,
      },
    });

    for (const teamMember of teamMembers) {
      const member = await User.findByPk(teamMember.UserId);
      team.push(member);
    }

    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({
      message: "Error getting the team members",
    });
  }
}

async function getTeamMembers(req, res) {
  try {
    const { projectId, userId } = req.params;

    const user = await User.findByPk(userId);

    let data = {
      manager: null,
      members: [],
    };

    let managerId;

    if (user.position === "manager") {
      data.manager = user;
      managerId = userId;
    } else if (user.position === "member") {
      const userProject = await ProjectUser.findOne({
        where: {
          ProjectId: projectId,
          UserId: userId,
        },
      });

      managerId = userProject.managerId;

      const manager = await User.findByPk(managerId);
      data.manager = manager;
    }

    const members = await ProjectUser.findAll({
      where: {
        ProjectId: projectId,
        managerId,
      },
    });

    for (const member of members) {
      const memberData = await User.findByPk(member.UserId);

      data.members.push(memberData);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "There was an error fetching the team members",
    });
  }
}

async function getTeamTasks(req, res) {
  try {
    const { projectId, managerId } = req.params;

    const tasks = await Task.findAll({
      where: {
        ProjectId: projectId,
        managerId,
      },
    });

    let tasksData = [];

    for (const task of tasks) {
      let taskData = { ...task.dataValues };

      taskData.assignedUser = null;

      const userTask = await TaskUser.findOne({
        where: {
          isAssigned: true,
          TaskId: task.id,
        },
      });

      if (userTask) {
        console.log(userTask);

        const user = await User.findByPk(userTask.UserId);
        taskData.assignedUser = user;
      }

      tasksData.push(taskData);
    }

    res.status(200).json(tasksData);
  } catch (error) {
    res.status(500).json({
      message: "There was an error fetching the team tasks",
    });
  }
}

export {
  addProjectMember,
  getProjectsMember,
  getProjectManagers,
  getProjectManagerTeam,
  getTeamMembers,
  getTeamTasks,
};
