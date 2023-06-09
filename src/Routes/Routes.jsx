import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddClasses from "../pages/Dashboard/Instructor/AddClasses";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import Home from "../pages/Home/Home/Home";
import InstructorsPage from "../pages/InstructorsPage/InstructorsPage";
import MyClasses from "../pages/InstructorsPage/MyClasses";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "instructors-page",
        element: <InstructorsPage></InstructorsPage>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "allusers",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "manageclasses",
        element: <ManageClasses></ManageClasses>,
      },
      // Instructors Element
      {
        path: "addclasses",
        element: <AddClasses></AddClasses>,
      },
      {
        path: "myclasses",
        element: <MyClasses></MyClasses>,
      },
    ],
  },
]);
