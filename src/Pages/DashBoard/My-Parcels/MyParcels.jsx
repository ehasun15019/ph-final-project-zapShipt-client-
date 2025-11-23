/* eslint-disable react-hooks/immutability */
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { PiMagnifyingGlassFill } from "react-icons/pi";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // handleDelete functionality
  const handleDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // backend delete data fetch with axios
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log("after deleted", res.data);

          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });

            // refresh the data in ui
            refetch();
          }
        });
      }
    });
  };


  // handle payment functionality
  const handlePayment = async(parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      name: parcel.parcelName
    }

    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
    // window.location.href = res.data.url;

    window.location.assign(res.data.url)
  }

  return (
    <div>
      <p>my parcel {parcels.length}</p>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((item, index) => {
              return (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.parcelName}</td>
                  <td>{item.cost}</td>
                  <td>
                    {item.paymentStatus === "paid" ? 
                    <span className="text-green-400">Paid</span> 
                    : <button onClick={() => handlePayment(item)} className="btn btn-primary btn-sm text-black">Pay</button>
                    }
                    </td>
                  <td>{item.deliveryStatus}</td> 

                  <td className="flex gap-2">
                    <button className="btn btn-square">
                      <PiMagnifyingGlassFill />
                    </button>
                    <button className="btn btn-square">
                      <AiFillEdit />
                    </button>
                    <button
                      className="btn btn-square"
                      onClick={() => handleDelete(item._id)}
                    >
                      <RiDeleteBin5Fill />
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

export default MyParcels;
