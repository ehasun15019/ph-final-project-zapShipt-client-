import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import SocialLogin from "../Social-login/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  // for redirect
  const location = useLocation();
  const navigate = useNavigate();

  // handle register function
  const handleRegister = (data) => {
    const profileImage = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        // 1. store the image with from data
        const fromData = new FormData();
        fromData.append("image", profileImage);
        const image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        // 2. fetch data with axios
        axios.post(image_Api_Url, fromData).then((res) => {
          const photoUrl = res.data.data.url;

          // update user profile for photo
          const userProfile = {
            displayName: data.name,
            photoURL: photoUrl,
          };

          // create user in the database
          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURL: photoUrl,
          };
          axiosSecure.post("/users", userInfo)
          .then((res) => {
            if(res.data.insertedId) {
              console.log('user created in the database')
            }
          })


          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile updated done");

              // for redirect
              navigate(location?.state || "/");
            })
            .catch((err) => {
              console.log(err.message);
            });
        });

        toast.success("You are registered successfully");
        reset();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white shadow-xl rounded-2xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-2">
          {/* image upload */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Photo
            </label>
            <input
              type="file"
              className="file-input w-full"
              placeholder="Your Photo"
              {...register("photo", { required: true })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm">photo is required</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="input input-bordered w-full rounded-lg"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="input input-bordered w-full rounded-lg"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="input input-bordered w-full rounded-lg"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{6,}$/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters long
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-sm">
                Must contain uppercase, lowercase, number & special character
              </p>
            )}
          </div>

          {/* Login Link */}
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-500 hover:underline ms-1"
              state={location.state}
            >
              Login
            </Link>
          </p>

          {/* Submit Button */}
          <button className="btn bg-primary text-black w-full rounded-xl text-lg">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="divider my-6">OR</div>

        {/* Social Login */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
