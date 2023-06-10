import { BiAddToQueue } from "react-icons/bi";
import {
  FaBookOpen,
  FaBookReader,
  FaRegBookmark,
  FaUsers,
  FaWallet
} from "react-icons/fa";
import {
  FcBusinessContact,
  FcGallery,
  FcHome
} from "react-icons/fc";
import { NavLink, Outlet } from "react-router-dom";



const Dashboard = () => {

  // const isAdmin = true;
  const isAdmin = false;
  // const isStudent = false;
  const isStudent = true;
  const isInstructor = false;
  // const isInstructor = true;

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          <Outlet></Outlet>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {isAdmin && (
              <>
                <li>
                  <NavLink to="/">
                    <FcHome className="text-2xl"></FcHome> Admin Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/manageclasses">
                    <FaBookReader className="text-2xl text-blue-500 "></FaBookReader>
                    Manage Classes
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/allusers">
                    <FaUsers className="text-2xl text-purple-500 "></FaUsers>
                    Manage Users
                  </NavLink>
                </li>

                <div className="divider"></div>
                <li>
                  <NavLink to="/">
                    <FcHome className="text-2xl"></FcHome> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <FcBusinessContact className="text-2xl"></FcBusinessContact>
                    Contact
                  </NavLink>
                </li>
              </>
            )}
            {isInstructor && (
              <>
                <li>
                  <NavLink to="/">
                    <FcHome className="text-2xl"></FcHome> Instructor Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/addclasses">
                    <BiAddToQueue className="text-2xl text-purple-500 "></BiAddToQueue>
                    Add Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myclasses">
                    <FcGallery className="text-2xl text-purple-500 "></FcGallery>
                    My Classes
                  </NavLink>
                </li>
                <div className="divider"></div>
                <li>
                  <NavLink to="/">
                    <FcHome className="text-2xl"></FcHome> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <FcBusinessContact className="text-2xl"></FcBusinessContact>
                    Contact
                  </NavLink>
                </li>
              </>
            )}

            {isStudent && (
              <>
                <li>
                  <NavLink to="/dashboard/selecedclass">
                    <FaRegBookmark className="text-2xl text-green-500"></FaRegBookmark>
                    Selected Classes
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/reservation">
                    <FaBookOpen className="text-2xl text-purple-600">
                      {" "}
                    </FaBookOpen>
                    Enrolled Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/payment">
                    <FaWallet className="text-2xl text-orange-700"> </FaWallet>{" "}
                    Payment History
                  </NavLink>
                </li>

                <div className="divider"></div>
                <li>
                  <NavLink to="/">
                    <FcHome className="text-2xl"></FcHome> Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <FcBusinessContact className="text-2xl"></FcBusinessContact>
                    Contact
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
