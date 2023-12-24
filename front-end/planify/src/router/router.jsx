import { createBrowserRouter } from "react-router-dom";
import RoleBasedAccess from "./RoleBasedAccess.jsx";
import App from "../App.jsx";
import SignIn from "../pages/signIn/SignIn.jsx";
import CreateProject from "../pages/createProject/CreateProject.jsx";
import Projects from "../pages/projects/Projects.jsx";
import Project from "../pages/project/Project.jsx";
import CreateUser from "../pages/createUser/CreateUser.jsx";

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
        element: <RoleBasedAccess roles={["admin", "manager", "executant"]} />,
        children: [
          {
            path: ":user_id",
            element: <Projects />,
          },
          {
            path: ":user_id/:project_id/tasks",
            element: "View project tasks",
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
        path: "/manager",
        element: <RoleBasedAccess roles={["manager"]} />,
        children: [
          {
            path: "create-task",
            element: "Create task",
          },
          {
            path: "view-executants",
            element: "View executants",
            children: [
              {
                path: ":user_id",
                element: "View executant tasks",
              },
            ],
          },
        ],
      },
      {
        path: "/user",
        element: <RoleBasedAccess roles={["manager", "executant"]} />,
        children: [
          {
            path: ":user_id",
            element: "View own tasks",
          },
        ],
      },
    ],
  },
]);

export default appRouter;
