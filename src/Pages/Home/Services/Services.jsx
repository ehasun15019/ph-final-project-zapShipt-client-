import React from "react";
import { services } from "../../../assets/assets";

const Services = () => {
  return (
    <div className="bg-accent rounded-[10px] py-16 my-9">
      <div className="text-white text-center">
        <h3 className="text-2xl md:text-3xl font-bold">Our Services</h3>
        <p className="text-secondary px-8">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br /> business shipments — we
          deliver on time, every time.
        </p>
      </div>

      <div className="card-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 justify-items-center gap-3 px-30">
        {services.map((item) => {
          return (
            <div
              className="card shadow-sm rounded-2xl w-80 bg-white hover:bg-primary transition-colors duration-200"
              key={item.id}
            >
              <div className="card-body flex flex-col justify-center items-center">
                <img src={item.img} alt="card-image" className="w-15" />
                <h2 className="card-title pt-3">{item.heading}</h2>
                <p>{item.details}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
