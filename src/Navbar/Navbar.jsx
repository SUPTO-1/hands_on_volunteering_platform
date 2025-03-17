import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const links = (
    <>
      <li className="text-xl font-poppins text-[#5A3E2B] font-medium">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="text-xl font-poppins text-[#5A3E2B]  font-medium">
        <NavLink to="/events">Events</NavLink>
      </li>
      <li className="text-xl font-poppins text-[#5A3E2B]  font-medium">
        <NavLink to="/community">Request</NavLink>
      </li>
      <li className="text-xl font-poppins text-[#5A3E2B] font-medium">
        <NavLink to="/teams">Teams</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar shadow-sm bg-[#E1EACD] p-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl font-poppins">Warriors</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost">
              {user.name}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/viewProfile" className="font-roboto font-medium">View Profile</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="font-roboto font-bold text-[#5A3E2B] text-xl"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
