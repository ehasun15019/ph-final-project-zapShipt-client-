import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  // for redirect
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIN = () => {
    signInGoogle()
      .then((getUser) => {
        console.log(getUser.user);

        toast.success("User Login successfully");
        // for redirect
        navigate(location?.state || "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="text-center pb-8">
      {/* Google */}
      <button
        className="btn text-black border-[#e5e5e5] bg-gray-100"
        onClick={handleGoogleSignIN}
      >
        <FcGoogle />
        Signup with Google
      </button>
    </div>
  );
};

export default SocialLogin;
