import React from "react";
import TitleList from "./TitleList";
import SideBar from "./SideBar";

export default function Universe() {
  return (
    <main className="flex py-8 md:px-8 relative max-w-[1100px] mx-auto">
      <div className="lg:block w-[40%] hidden  pr-8">
        <SideBar />
      </div>

      <div className="lg:w-[60%] w-[90%] max-w-[800px] mx-auto">
        <TitleList />
      </div>
    </main>
  );
}
