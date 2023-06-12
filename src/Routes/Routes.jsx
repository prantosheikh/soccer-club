import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import SecureAdmin from "../ProtectedRoutes/SecureAdmin";
import SecureInstructors from "../ProtectedRoutes/SecureInstructors";
import AllClasses from "../pages/AllClasses/AllClasses";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddClasses from "../pages/Dashboard/Instructor/AddClasses";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import Enrolled from "../pages/Dashboard/Student/Enrolled";
import PaymentMethod from "../pages/Dashboard/Student/PaymentMethod/PaymentMethod";
import SelectedClass from "../pages/Dashboard/Student/SelectedClass";
import Home from "../pages/Home/Home/Home";
import InstructorsPage from "../pages/InstructorsPage/InstructorsPage";
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
        path: "allClasses",
        element: (
          <ProtectedRoutes>
            <AllClasses></AllClasses>
          </ProtectedRoutes>
        ),
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
    element: (
      <ProtectedRoutes>
        <Dashboard></Dashboard>
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "allusers",
        element: (
          <ProtectedRoutes>
            <SecureAdmin>
              <AllUsers></AllUsers>,
            </SecureAdmin>
          </ProtectedRoutes>
        ),
      },
      {
        path: "manageclasses",
        element: (
          <ProtectedRoutes>
            <SecureAdmin>
              <ManageClasses></ManageClasses>,
            </SecureAdmin>
          </ProtectedRoutes>
        ),
      },
      // Instructors Element
      {
        path: "addclasses",
        element: (
          <ProtectedRoutes>
            <SecureInstructors>
              <AddClasses></AddClasses>,
            </SecureInstructors>
          </ProtectedRoutes>
        ),
      },
      {
        path: "myclasses",
        element: (
          <ProtectedRoutes>
            <SecureInstructors>
              <MyClasses></MyClasses>,
            </SecureInstructors>
          </ProtectedRoutes>
        ),
      },
      // Student Element
      {
        path: "selecedclass",
        element: (
          <ProtectedRoutes>
            <SelectedClass></SelectedClass>,
          </ProtectedRoutes>
        ),
      },
      {
        path: "paymentmethod",
        element: (
          <ProtectedRoutes>
            <PaymentMethod></PaymentMethod>
          </ProtectedRoutes>
        ),
      },
      {
        path: "enrolled",
        element: (
          <ProtectedRoutes>
            <Enrolled></Enrolled>
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);
