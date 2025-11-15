import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { assets } from "../../../assets/assets";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} className="my-6">
      <div className="relative">
        <img src={assets.banner1} />

        <div className="absolute bottom-18 left-20 hidden xl:flex">
            <div className="flex gap-3 items-center">
                <button className="btn btn-lg bg-primary rounded-full px-9">Track Your Parcel</button>
                <button className="btn bg-transparent border border-black px-6">Be Aa Rider</button>
            </div>
        </div>
      </div>

      <div className="relative">
        <img src={assets.banner2} />

        <div className="absolute bottom-18 left-20 hidden xl:flex">
            <div className="flex gap-3 items-center">
                <button className="btn btn-lg bg-primary rounded-full px-9">Track Your Parcel</button>
                <button className="btn bg-transparent border border-black px-6">Be Aa Rider</button>
            </div>
        </div>
      </div>

      <div className="relative">
        <img src={assets.banner3} />

        <div className="absolute bottom-18 left-20 hidden xl:flex">
            <div className="flex gap-3 items-center">
                <button className="btn btn-lg bg-primary rounded-full px-9">Track Your Parcel</button>
                <button className="btn bg-transparent border border-black px-6">Be A Rider</button>
            </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
