import React from "react";
import { HowItsWorks, } from "../../../assets/assets";

const HowItsWork = () => {
  return (
    <div className="py-9 px-15">
      <h4 className="font-bold text-3xl text-center md:text-left">How it Works</h4>

      <div className="card-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 justify-items-center gap-4">
        {HowItsWorks.map((item) => {
          return (
            <div className="card shadow-sm rounded-2xl w-70 border border-gray-300" key={item.id}>
              <div className="card-body">
                <img src={item.img} alt="card-image" className="w-15" />
                <h2 className="card-title pt-3">{item.heading}</h2>
                <p>
                  {item.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowItsWork;
