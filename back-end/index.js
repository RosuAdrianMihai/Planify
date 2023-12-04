import express from "express";
import cors from "cors";
import router from "./api/routes.js";
import database from "./database.js";

const PORT = 5001;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(PORT, async () => {
  try {
    await database.authenticate();

    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log(`Error connecting to db: ${error}`);
  }
});
