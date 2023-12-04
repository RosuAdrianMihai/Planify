const TaskUserModel = (sequelize, DataTypes) => {
  const taskUser = sequelize.define("TaskUser", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoincrement: true,
    },
    isAssigned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return taskUser;
};

export default TaskUserModel;
