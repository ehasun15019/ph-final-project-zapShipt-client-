import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { FaBars } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth(); // 62-1 min: 4.22

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log out successfully");
      })
      .catch((err) => {
        toast.error(err.massage);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/about">About us</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <FaBars />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="text-xl">
          <Logo></Logo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end flex gap-4">
        {user ? (
          <a className="btn" onClick={handleLogOut}>
            Log Out
          </a>
        ) : (
          <Link to="/login" className="btn">
            Login
          </Link>
        )}

        <Link to="/rider" className="btn btn-primary text-black">Be a rider</Link>
      </div>
    </div>
  );
};

export default Navbar;
