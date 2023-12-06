import { TaskUser } from "../../models/index.js";
import { Task } from "../../models/index.js";
import { User } from "../../models/index.js";

async function requestTask(req, res) {
  try {
    const requestData = req.body;
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(200).json({
        message: "The task does not exist",
      });
    }

    await TaskUser.create({
      TaskId: taskId,
      UserId: requestData.userId,
      isAssigned: requestData.isAssigned,
    });

    const user = await User.findByPk(requestData.userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function assignTask(req, res) {
  try {
    const { isAssigned } = req.body;
    const { taskId, userId } = req.params;

    const taskUser = await TaskUser.findOne({
      where: {
        TaskId: taskId,
        UserId: userId,
        isAssigned: false,
      },
    });

    if (!taskUser) {
      await TaskUser.create({
        TaskId: taskId,
        UserId: userId,
        isAssigned,
      });
    } else {
      await taskUser.update({
        isAssigned,
      });
    }

    await TaskUser.destroy({
      where: {
        TaskId: taskId,
        isAssigned: false,
      },
    });

    const user = await User.findByPk(userId);

    res.status(200).json({
      message: "You successfully assigned the task",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error assigning the task",
    });
  }
}

async function getUserTasks(req, res) {
  try {
    const { userId } = req.params;

    const tasks = await TaskUser.findAll({
      where: {
        UserId: userId,
        isAssigned: true,
      },
    });

    let taskList = [];

    for (const task of tasks) {
      const taskInfo = await Task.findByPk(task.TaskId);
      taskList.push(taskInfo);
    }

    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({
      message: "There was an error fetching the tasks",
    });
  }
}

async function getTaskApplicants(req, res) {
  try {
    const { taskId } = req.params;

    const applicants = await TaskUser.findAll({
      where: {
        TaskId: taskId,
      },
    });

    let userList = [];

    for (const applicant of applicants) {
      const userInfo = await User.findByPk(applicant.UserId);
      userList.push(userInfo);
    }

    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({
      message: "There was an error fetching the applicants",
    });
  }
}

async function retreatTaskRequest(req, res) {
  try {
    const { taskId, userId } = req.params;

    await TaskUser.destroy({
      where: {
        TaskId: taskId,
        UserId: userId,
        isAssigned: false,
      },
    });

    res.status(200).json({
      message: "You successfully retreated the task request",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retreating the task request",
    });
  }
}

export {
  requestTask,
  assignTask,
  getUserTasks,
  getTaskApplicants,
  retreatTaskRequest,
};
