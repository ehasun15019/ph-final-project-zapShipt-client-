import React from "react";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router";
import { assets } from "../../assets/assets";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // data loading from router.jsx
  const serviceCenter = useLoaderData();
  const regionsDuplicate = serviceCenter.map((r) => r.region);
  const regions = [...new Set(regionsDuplicate)];

  // explore useWatch
  const riderRegion = useWatch({ control, name: "region" });

  // handle be a rider functionality
  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your application was submitted. We will reach out in 3 days",
          showCancelButton: false,
          timer: 2000,
        });
      }
    });
  };

  // district region
  const districtByRegion = (region) => {
    const regionsDistricts = serviceCenter.filter((r) => {
      return r.region === region;
    });

    const district = regionsDistricts.map((d) => {
      return d.district;
    });

    return district;
  };

  return (
    <div className="bg-white my-6 rounded px-6 py-6">
      <div className="py-4">
        <h1 className="text-3xl font-bold">Be a Rider</h1>
        <p className="text-[0.9rem] pt-2">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. <br /> From personal packages to business shipments — we
          deliver on time, every time.
        </p>
      </div>
      <hr />

      <div className="mt-6">
        <form onSubmit={handleSubmit(handleRiderApplication)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <section>
              <img src={assets.agentPending} alt="" />
            </section>

            <section>
              {/* Rider information */}
              <fieldset className="fieldset">
                <h2 className="text-2xl font-semibold mb-2">Rider Details</h2>

                {/* s name */}
                <label className="label">Rider Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Rider Name"
                  defaultValue={user?.displayName}
                  {...register("Name")}
                />

                {/* s Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Rider Email"
                  defaultValue={user?.email}
                  {...register("Email")}
                />

                <div className="flex gap-4">
                  {/* s Region */}
                  <div className="w-full">
                    <label className="label mt-4">Region</label>
                    <select
                      {...register("region")}
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
                    <label className="label mt-4">District</label>
                    <select
                      {...register("district")}
                      defaultValue="Pick a district"
                      className="select w-full"
                    >
                      <option disabled={true} value="Pick a district">
                        Pick a District
                      </option>
                      {districtByRegion(riderRegion).map((d, index) => (
                        <option key={index} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* s Address */}
                <label className="label mt-4">Your Address</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Your Address"
                  {...register("address")}
                />
              </fieldset>

              {/* More Information */}
              <fieldset className="fieldset">
                <h2 className="text-2xl font-semibold mb-2">
                  More Information
                </h2>

                {/* r Name */}
                <label className="label">Driving Licenses</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Driving Licenses"
                  {...register("license")}
                />

                {/* r Email */}
                <label className="label">NID</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="NID"
                  {...register("nid")}
                />

                {/* r Address */}
                <label className="label mt-4">BIKE Information</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="BIKE Information"
                  {...register("bike")}
                />
              </fieldset>

              <button className="btn btn-primary text-black mt-4" type="submit">
                Apply as a Rider
              </button>
            </section>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Rider;
