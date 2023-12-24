import { User } from "../../models/index.js";

async function createUser(req, res) {
  try {
    const userData = req.body;

    const foundUser = await User.findOne({
      where: {
        email: userData.email,
      },
    });

    if (foundUser) {
      return res.status(500).json({
        message: "There is already an account with this email",
      });
    }

    const user = await User.create(userData);

    res.status(200).json({
      message: "User successfully created",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating the user",
    });
  }
}

async function signInUser(req, res) {
  const credentials = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: credentials.email,
        password: credentials.password,
      },
    });

    if (user === null) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export { createUser, signInUser, getUsers };
