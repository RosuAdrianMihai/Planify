const ProjectModel = (sequelize, DataTypes) => {
  const Project = sequelize.define("Project", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Project;
};

export default ProjectModel;
