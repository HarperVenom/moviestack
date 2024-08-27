import React from "react";
import TitleList from "./TitleList";
import SideBar from "./SideBar";

export default function Universe() {
  return (
    <div className="flex gap-8 mx-4 my-8">
      <div className="flex-grow max-w-[400px] hidden lg:flex">
        <SideBar></SideBar>
      </div>

      <div className="w-full max-w-[600px] m-auto">
        <TitleList />
      </div>
    </div>
  );
}
