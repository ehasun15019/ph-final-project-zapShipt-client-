import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import SocialLogin from "../Social-login/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { LoginUser, sendPasswordLink } = useAuth();
  const email = watch("email");

  // for redirect
  const location = useLocation();
  const navigate = useNavigate();

  // handle login
  const handleLogin = (data) => {
    console.log(data);
    LoginUser(data.email, data.password)
      .then((getUser) => {
        console.log(getUser.user);
        toast.success("User login successfully");
        // for redirect
        navigate(location?.state || '/')
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // handle password reset
  const handleResetPassword = () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    sendPasswordLink(email)
      .then(() => {
        toast.success("Password reset link send on your email");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="card bg-white/90 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-md mx-auto mt-14 border border-gray-200">
      <form
        className="card-body px-8 py-10"
        onSubmit={handleSubmit(handleLogin)}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <h3 className="text-3xl font-extrabold text-gray-800">
            Welcome Back
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            Login to your ZapShift account
          </p>
        </div>

        <fieldset className="space-y-3">
          {/* Email */}
          <div>
            <label className="label font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="input input-bordered w-full rounded-lg"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label font-medium text-gray-700">Password</label>
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
              <p className="text-red-500 text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters long
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-sm mt-1">
                Must include uppercase, lowercase, number & special character
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="link link-hover text-sm"
              onClick={handleResetPassword}
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button className="btn btn-primary text-black w-full rounded-xl mt-2 text-lg">
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-gray-600 text-center mt-3">
            Don't have an account?
            <Link to="/register" className="text-blue-500 font-medium ms-1" state={location.state}>
              Register
            </Link>
          </p>
        </fieldset>
      </form>

      {/* Divider */}
      <div className="px-8 pb-6">
        <div className="divider text-gray-400">OR</div>

        {/* Social Login */}
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
