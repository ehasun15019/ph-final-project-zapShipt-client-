import React from "react";
import { featuresData } from "../../../assets/assets";

const Features = () => {
  return (
    <div>
      {featuresData.map((item) => (
        <div
          key={item.id}
          className="
      card bg-white shadow-md mb-6 border border-gray-200
      flex flex-col md:flex-row items-center md:items-start
    "
        >
          <figure className="p-4 flex justify-center md:justify-start">
            <img src={item.img} alt={item.title} className="w-24 md:w-28" />
          </figure>

          <div className="card-body text-center md:text-left">
            <h2 className="card-title">{item.title}</h2>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
