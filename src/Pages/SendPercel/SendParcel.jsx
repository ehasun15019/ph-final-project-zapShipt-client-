import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // redirect to payment
  const navigate = useNavigate();

  // data loading from router.jsx
  const serviceCenter = useLoaderData();
  const regionsDuplicate = serviceCenter.map((r) => r.region);
  const regions = [...new Set(regionsDuplicate)];

  // explore useWatch
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtByRegion = (region) => {
    const regionsDistricts = serviceCenter.filter((r) => {
      return r.region === region;
    });

    const district = regionsDistricts.map((d) => {
      return d.district;
    });

    return district;
  };

  // handle send parcel
  const handleSendParcel = (data) => {
    console.log(data);

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderRegion === data.receiverRegion;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    // console.log("const", cost);
    data.cost = cost;

    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charged ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "confirm and continue payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        // save the parcel info to the database
        axiosSecure.post("/parcels", data).then((res) => {
          if (res.data.insertedId) {
            navigate('/dashboard/my-parcels');
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Parcel has created. Please pay",
              showCancelButton: false,
              timer: 2500,
            });
          }
        });
      }
    });
  };

  return (
    <div className="my-12 px-6 bg-white text-black py-7 rounded-[13px]">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-2xl lg:text-5xl font-bold">
          Send Parcel
        </h2>
        <p className="text-[0.9639rem] font-semibold">
          Enter your parcel details
        </p>
      </div>

      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* Parcel Type */}
        <div className="flex gap-3 my-2 mt-10">
          <label className="label">
            <input
              type="radio"
              value="document"
              className="radio radio-success"
              defaultChecked
              {...register("parcelType")}
            />
            Document
          </label>

          <label className="label">
            <input
              type="radio"
              value="non-document"
              className="radio radio-success"
              {...register("parcelType")}
            />
            Non Document
          </label>
        </div>

        {/* Parcel Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Parcel Name"
              {...register("parcelName")}
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Parcel Weight (KG)</label>
            <input
              type="number"
              className="input w-full"
              placeholder="Parcel Weight"
              {...register("parcelWeight")}
            />
          </fieldset>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-semibold mb-2">Sender Details</h2>

            {/* s name */}
            <label className="label">Sender Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Sender Name"
              defaultValue={user?.displayName}
              {...register("senderName")}
            />

            {/* s Email */}
            <label className="label">Sender Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Sender Email"
              defaultValue={user?.email}
              {...register("senderEmail")}
            />

            <div className="flex gap-4">
              {/* s Region */}
              <div className="w-full">
                <label className="label mt-4">Sender Region</label>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a Region"
                  className="select w-full"
                >
                  <option disabled={true} value="Pick a Region">
                    Pick a Region
                  </option>
                  {regions.map((r, index) => (
                    <option key={index} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* s District */}
              <div className="w-full">
                <label className="label mt-4">Sender District</label>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true} value="Pick a district">
                    Pick a District
                  </option>
                  {districtByRegion(senderRegion).map((d, index) => (
                    <option key={index} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* s Address */}
            <label className="label mt-4">Sender Address</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Sender Address"
              {...register("senderAddress")}
            />
          </fieldset>

          {/* Receiver */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-semibold mb-2">Receiver Details</h2>

            {/* r Name */}
            <label className="label">Receiver Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Receiver Name"
              {...register("receiverName")}
            />

            {/* r Email */}
            <label className="label">Receiver Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Receiver Email"
              {...register("receiverEmail")}
            />

            <div className="flex gap-4">
              {/* r Region */}
              <div className="w-full">
                <label className="label mt-4">Receiver Region</label>
                <select
                  {...register("receiverRegion")}
                  defaultValue="Pick a Region"
                  className="select w-full"
                >
                  <option disabled={true} value="Pick a Region">
                    Pick a Region
                  </option>
                  {regions.map((r, index) => (
                    <option key={index} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* r District */}
              <div className="w-full">
                <label className="label mt-4">Receiver District</label>
                <select
                  {...register("receiverDistrict")}
                  defaultValue="Pick a district"
                  className="select w-full"
                >
                  <option disabled={true} value="Pick a district">
                    Pick a District
                  </option>
                  {districtByRegion(receiverRegion).map((d, index) => {
                    return (
                      <option key={index} value={d}>
                        {d}
                      </option>
                    );
                  })}

                  {/* <option key={index} value={d}></option> */}
                </select>
              </div>
            </div>

            {/* r Address */}
            <label className="label mt-4">Receiver Address</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Receiver Address"
              {...register("receiverAddress")}
            />
          </fieldset>
        </div>

        <button className="btn btn-primary text-black mt-4" type="submit">
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
