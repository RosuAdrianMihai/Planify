import { Sequelize } from "sequelize";

const database = new Sequelize({
  dialect: "sqlite",
  storage: "./planify.db",
});

database.sync({ alter: true }).then(() => {
  console.log("Database synchronized");
});

export default database;
