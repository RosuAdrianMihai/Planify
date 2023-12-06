import database from "../database.js";
import { DataTypes } from "sequelize";
import UserModel from "./users.js";
import ProjectModel from "./projects.js";
import ProjectUserModel from "./projectUsers.js";
import TaskModel from "./tasks.js";
import TaskUserModel from "./taskUsers.js";

const User = UserModel(database, DataTypes);
const Project = ProjectModel(database, DataTypes);
const ProjectUser = ProjectUserModel(database, DataTypes);
const Task = TaskModel(database, DataTypes);
const TaskUser = TaskUserModel(database, DataTypes);

Project.belongsToMany(User, {
  through: ProjectUser,
  uniqueKey: false,
});
User.belongsToMany(Project, {
  through: ProjectUser,
  uniqueKey: false,
});

Project.hasMany(Task);
Task.belongsTo(Project);

User.belongsToMany(Task, {
  through: TaskUser,
  uniqueKey: false,
});
Task.belongsToMany(User, {
  through: TaskUser,
  uniqueKey: false,
});

export { User, Project, ProjectUser, Task, TaskUser };
