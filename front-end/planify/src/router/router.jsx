import { createBrowserRouter } from "react-router-dom";
import RoleBasedAccess from "./RoleBasedAccess.jsx";
import App from "../App.jsx";
import SignIn from "../pages/signIn/SignIn.jsx";
import CreateProject from "../pages/createProject/CreateProject.jsx";

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
            element: <div>Hello</div>,
            children: [
              {
                path: "tasks",
                element: "View user tasks",
              },
              {
                path: ":project_id",
                element: "View project tasks",
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
            element: <CreateProject />,
          },
          {
            path: "add-user",
            element: "Add user",
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
