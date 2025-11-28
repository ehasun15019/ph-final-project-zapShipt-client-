import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemove } from "react-icons/io5";
import { BsTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  // update status rider
  const updateStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.Email.toLowerCase() };

    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Rider status is set to ${status}`,
          showCancelButton: false,
          timer: 2000,
        });
      }
    });
  };

  // handle Approval riders
  const handleApprovalRider = (rider) => {
    updateStatus(rider, "approved");
  };

  //   handle Rejection Riders
  const handleRejectionRider = (rider) => {
    updateStatus(rider, "rejected");
  };

  // handle Delete
  const handleDelete = (rider) => {
    Swal.fire({
      icon: "error",
      title: "Are you sure...",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${rider._id}`).then((res) => {
          refetch();
          console.log(res.data);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Rider has been deleted.",
            timer: 2500,
          });
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl">Riders pending Approval: {riders.length}</h2>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>email</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.Name}</td>
                  <td>{item.Email}</td>
                  <td>
                    <p
                      className={
                        item.status === "approved"
                          ? "text-green-500"
                          : item.status === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                    >
                      {item.status}
                    </p>
                  </td>

                  <td>{item.workStatus}</td>

                  <td>{item.district}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm"
                      onClick={() => handleApprovalRider(item)}
                    >
                      <FaUserCheck />
                    </button>

                    <button
                      className="btn btn-sm"
                      onClick={() => handleRejectionRider(item)}
                    >
                      <IoPersonRemove />
                    </button>

                    <button
                      className="btn btn-sm"
                      onClick={() => handleDelete(item)}
                    >
                      <BsTrash3Fill />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
