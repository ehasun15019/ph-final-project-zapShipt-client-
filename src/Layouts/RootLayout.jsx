import React from "react";
import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar></Navbar>

      <main className="">
        <Outlet></Outlet>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default RootLayout;

// bg-[#F0F0F0]