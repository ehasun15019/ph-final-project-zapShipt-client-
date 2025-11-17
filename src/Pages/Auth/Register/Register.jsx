import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        className="max-w-md mx-auto mt-10"
        onSubmit={handleSubmit(handleRegister)}
      >
        <fieldset className="fieldset p-6 bg-base-100 rounded-xl shadow-lg space-y-1">
          <h2 className="text-2xl font-semibold text-center mb-2">
            Welcome Back
          </h2>
          {/* Name */}
          <label className="label">
            <span className="label-text font-medium">Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter your Name"
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}


          {/* Email */}
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}


          {/* Password */}
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{6,}$/,
            })}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be at least 6 characters long
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              password have must 1 uppercase, 1 lowercase , 1 number, 1 special
              character
            </p>
          )}


          <p className="text-[0.9236rem]">
            Already have an account?
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
          <button className="btn bg-primary w-full mt-2">Register</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
