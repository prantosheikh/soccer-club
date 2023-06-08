import {
    FaBook,
    FaShoppingCart,
    FaUsers,
    FaUtensils,
    FaWallet,
} from "react-icons/fa";
import {
    FcBusinessContact,
    FcCalendar,
    FcHome,
    FcList,
    FcMenu,
    FcShop,
} from "react-icons/fc";
import { NavLink } from "react-router-dom";



const Dashboard = () => {

    const isAdmin = true;

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <h3>hi</h3>
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
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/">
                    <FcHome className="text-2xl"></FcHome> Admin Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/additem">
                    <FaUtensils className="text-slate-100 text-2xl">
                      {" "}
                    </FaUtensils>{" "}
                    Add an Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageitems">
                    <FcList className="text-2xl text-orange-500"> </FcList>{" "}
                    Manage Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/mycart">
                    <FaBook className="text-2xl text-orange-500"></FaBook>
                    Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allusers">
                    <FaUsers className="text-2xl text-purple-500"></FaUsers>
                    All Users
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
                    <FcMenu className="text-2xl"></FcMenu> Munu
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <FcShop className="text-2xl"></FcShop> Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <FcBusinessContact className="text-2xl"></FcBusinessContact>
                    Contact
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/">
                    <FcHome className="text-2xl"></FcHome> User Home
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/reservation">
                    <FcCalendar className="text-2xl"> </FcCalendar> Reservation
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/payment">
                    <FaWallet className="text-2xl text-orange-500"> </FaWallet>{" "}
                    Payment History
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/mycart">
                    <FaShoppingCart className="text-2xl text-blue-500"></FaShoppingCart>
                    My Cart
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
                    <FcMenu className="text-2xl"></FcMenu> Munu
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <FcShop className="text-2xl"></FcShop> Shop
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
