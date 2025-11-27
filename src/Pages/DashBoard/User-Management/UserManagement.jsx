import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { LuShieldOff } from "react-icons/lu";
import Swal from "sweetalert2";
import { IoSearchSharp } from "react-icons/io5";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  // user role updated for 'user to admin'
  const handleMakeUser = (user) => {
    const roleInfo = { role: "admin" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.displayName} marked as admin`,
          showCancelButton: false,
          timer: 3000,
        });
      }
    });
  };

  // user role updated for 'admin to user'
  const handleMakerUser = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${user.displayName} removed as admin`,
          showCancelButton: false,
          timer: 3000,
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl">Manage Users {users.length}</h2>

      {/* search bar  */}
      <div className="py-4 flex justify-end">
        <label className="input">
          <IoSearchSharp />
          <input
            type="search"
            className="grow"
            placeholder="Search User"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>

                  <td>
                    {item.role === "admin" ? (
                      <button
                        className="btn btn-sm bg-red-300"
                        onClick={() => handleMakerUser(item)}
                      >
                        <LuShieldOff />
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm bg-green-300"
                        onClick={() => handleMakeUser(item)}
                      >
                        <FaUserShield />
                      </button>
                    )}
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
