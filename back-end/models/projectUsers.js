const ProjectUserModel = (sequelize, DataTypes) => {
  const ProjectUser = sequelize.define("ProjectUser", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    managerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });

  return ProjectUser;
};

export default ProjectUserModel;
