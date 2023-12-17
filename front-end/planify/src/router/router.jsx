import { createBrowserRouter } from "react-router-dom";
import RoleBasedAccess from "./RoleBasedAccess.jsx";
import {
  userProjects,
  getExecutants,
  getUserTasks,
} from "../loaders/userLoaders.js";
import { signInUser } from "../actions/userActions.js";
import { viewProjectTasks } from "../loaders/projectLoaders.js";
import { createProject } from "../actions/projectActions.js";
import { createTask } from "../actions/taskActions.js";
import App from "../App.jsx";
import SignIn from "../pages/signIn/SignIn.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SignIn />,
        action: signInUser,
      },
      {
        path: "/common",
        element: <RoleBasedAccess roles={["admin", "manager", "executant"]} />,
        children: [
          {
            path: ":user_id",
            element: <div>Hello</div>,
            // loader: userProjects,
            children: [
              {
                path: "tasks",
                element: "View user tasks",
                // loader: viewUserTasks
              },
              {
                path: ":project_id",
                element: "View project tasks",
                // loader: viewProjectTasks,
              }
            ],
          },
        ],
      },
      {
        path: "/admin",
        element: <RoleBasedAccess roles={["admin"]} />,
        children: [
          {
            path: "create-project",
            element: "Create project",
            // action: createProject,
          },
          {
            path: "add-user",
            element: "Add user",
            // action: createProject,
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
            // action: createTask,
          },
          {
            path: "view-executants",
            element: "View executants",
            // loader: getExecutants,
            children: [
              {
                path: ":user_id",
                element: "View executant tasks",
                // loader: getUserTasks,
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
            // loader: getUserTasks,
          },
        ],
      },
    ],
  },
]);

export default appRouter;
