import { Task } from "../../models/index.js";

async function createTask(req, res) {
  try {
    const { projectId } = req.params;
    const taskData = req.body;

    const task = await Task.create({
      managerId: taskData.managerId,
      title: taskData.title,
      description: taskData.description,
      status: "OPEN",
      ProjectId: projectId,
    });

    res.status(200).json({
      message: "Task successfully created",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating the task",
    });
  }
}

async function updateTaskStatus(req, res) {
  try {
    const { status } = req.body;
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(500).json({
        message: "Task not found",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json({
      message: `Task ${status.toLowerCase()}`,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function updateTask(req, res) {
  try {
    const { projectId, taskId } = req.params;
    const taskData = req.body;

    const task = await Task.update(
      {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        ProjectId: projectId,
      },
      {
        where: {
          id: taskId,
        },
      }
    );

    res.status(200).json({
      message: "Task successfully updated",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating the task",
    });
  }
}

async function getProjectTasks(req, res) {
  try {
    const { projectId } = req.params;

    const projectTasks = await Task.findAll({
      where: {
        ProjectId: projectId,
      },
    });

    res.status(200).json(projectTasks);
  } catch (error) {
    res.status(500).json({
      message: "Error getting the tasks for the project",
    });
  }
}

export { createTask, updateTaskStatus, updateTask, getProjectTasks };
