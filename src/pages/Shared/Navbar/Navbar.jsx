import { Link } from "react-router-dom";
import logo from '../../../assets/logo/icons8-football-64.png';
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log(user);
     const handleLogOut = () => {
      logOut()
        .then(() => {})
        .catch((error) => {
          console.log(error);
        });
    };

  const Navbar = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/instructors-page">Instructors Page</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link to="/allClasses">Classes</Link>
      </li>
    </>
  );
    return (
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {Navbar}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl ">
            <img src={logo} alt="" />{" "}
            <span className="text-3xl">Soccer Club</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Navbar}</ul>
        </div>
        <div className="navbar-end">
          {user && <img  className="rounded-full me-4 w-12 h-12" src={user?.photoURL} alt="" />}

          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-primary  text-white font-bold"
            >
              LogOut
            </button>
          ) : (
            <Link to="/login">
              <a className="btn btn-primary text-white font-bold me-4">Login</a>
            </Link>
          )}
        </div>
      </div>
    );
};

export default Navbar;