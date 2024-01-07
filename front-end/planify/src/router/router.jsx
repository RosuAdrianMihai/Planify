import { createBrowserRouter } from "react-router-dom";
import RoleBasedAccess from "./RoleBasedAccess.jsx";
import App from "../App.jsx";
import SignIn from "../pages/signIn/SignIn.jsx";
import CreateProject from "../pages/createProject/CreateProject.jsx";
import Projects from "../pages/projects/Projects.jsx";
import Project from "../pages/project/Project.jsx";
import CreateUser from "../pages/createUser/CreateUser.jsx";
import UserTasks from "../pages/userTasks/UserTasks.jsx";
import UserProjectTasks from "../pages/userProjectTasks/UserProjectTasks.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SignIn />,
      },
      {
        path: "/common",
        element: <RoleBasedAccess roles={["admin", "manager", "member"]} />,
        children: [
          {
            path: ":user_id",
            element: <Projects />,
          },
          {
            path: ":user_id/:project_id",
            element: <Project />,
          },
        ],
      },
      {
        path: "/admin",
        element: <RoleBasedAccess roles={["admin"]} />,
        children: [
          {
            path: "create-project",
            element: <CreateProject />,
          },
          {
            path: "create-account",
            element: <CreateUser />,
          },
        ],
      },
      {
        path: "/user",
        element: <RoleBasedAccess roles={["manager", "member"]} />,
        children: [
          {
            path: ":user_id/tasks",
            element: <UserTasks />,
          },
          {
            path: ":user_id/:project_id/tasks",
            element: <UserProjectTasks />
          }
        ],
      },
    ],
  },
]);

export default appRouter;
