import React from "react";
import { IoHome } from "react-icons/io5";
import { FaTruckMoving, FaUsers } from "react-icons/fa6";
import { TbBikeFilled, TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { Link, NavLink, Outlet } from "react-router";
import { MdWorkHistory } from "react-icons/md";
import { RiEBikeFill } from "react-icons/ri";
import userRole from "../Hooks/useUserRole";
import useAuth from "../Hooks/useAuth";

const DashBoardLayout = () => {
  const { role } = userRole();
  const { user } = useAuth();

  return (
    <div className="drawer lg:drawer-open bg-secondary">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <TbLayoutSidebarLeftExpand />
          </label>
          <div className="px-4">
            <h3 className="text-2xl">ZapShift Dashboard</h3>
            <p className="text-red-500">{user.displayName}</p>
          </div>
        </nav>
        {/* Page content here */}

        <main className="max-w-7xl mx-auto bg-white px-5 py-5 rounded mt-6">
          <Outlet></Outlet>
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
                to="/"
              >
                {/* Home icon */}
                <IoHome size={20} />
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* my parcel */}
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                to="/dashboard/my-parcels"
                data-tip="My parcel"
              >
                <FaTruckMoving size={20} />
                <span className="is-drawer-close:hidden">My Parcel</span>
              </Link>
            </li>

            {/* Payment History */}
            <li>
              <Link
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                to="/dashboard/payment-history"
                data-tip="Payment History"
              >
                <MdWorkHistory size={20} />
                <span className="is-drawer-close:hidden">Payment History</span>
              </Link>
            </li>

            {role === "admin" && (
              <>
                {/* user management */}
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    to="/dashboard/user-management"
                    data-tip="User Management"
                  >
                    <FaUsers size={20} />
                    <span className="is-drawer-close:hidden">
                      User Management
                    </span>
                  </Link>
                </li>

                {/* Approve Riders */}
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    to="/dashboard/approve-riders"
                    data-tip="Approve Riders"
                  >
                    <RiEBikeFill size={20} />
                    <span className="is-drawer-close:hidden">
                      Approve Riders
                    </span>
                  </Link>
                </li>

                {/* Assign Riders */}
                <li>
                  <Link
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    to="/dashboard/assign-riders"
                    data-tip="Assign Riders"
                  >
                    <TbBikeFilled size={20} />
                    <span className="is-drawer-close:hidden">
                      Assign Riders
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* example */}
            {/* <li>
              <NavLink to="/coverage">Coverage</NavLink>
            </li> */}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
