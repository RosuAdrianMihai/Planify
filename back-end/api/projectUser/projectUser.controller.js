import { ProjectUser } from "./../../models/index.js";

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
      return res.status(200).json({
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

export { addProjectMember };
