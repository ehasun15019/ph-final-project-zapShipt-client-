import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();

  // for redirect
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIN = () => {
    signInGoogle()
      .then((getUser) => {
        console.log(getUser.user);

        toast.success("User Login successfully");

        // create user in database
        const userInfo = {
          email: getUser.user.email,
          displayName: getUser.user.displayName,
          photoURL: getUser.user.photoUrl,
        };

        axiosSecure
          .post("/users", userInfo)
          .then((res) => {
            console.log("user add in database : ", res.data);

            // for redirect
            navigate(location?.state || "/");
          })
          .catch((err) => {
            console.log(err.massage);
          });
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
