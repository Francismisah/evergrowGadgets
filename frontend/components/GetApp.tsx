import React from "react";
import Button from "./Button";
import Image from "next/image";

const GetApp = () => {
  return (
    <section className="flexCenter w-full flex-col pb-[100px]">
      <div className="get-app">
        <div className=" flex w-full flex-1 flex-col items-start justify-center gap-12">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[520px] capitalize">
            <span className="text-red-800"> Ready to Get</span> Your Laptops
            Fixed
          </h2>

          <div
            className="flex flex-col  whitespace-nowrap
            xl:flex-row"
          >
            <Button
              type="button"
              title="Learn More"
              icon=""
              variant="btn_white"
              full
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetApp;
