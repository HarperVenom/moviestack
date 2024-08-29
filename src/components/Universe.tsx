import React from "react";
import TitleList from "./TitleList";
import SideBar from "./SideBar";

export default function Universe() {
  return (
    <main className="flex py-8 md:px-8 relative mb-[25vh]">
      <div className="w-[40%] hidden md:block pr-8">
        <SideBar />
      </div>

      <div className="w-[90%] max-w-[800px] md:w-[60%] m-auto">
        <TitleList />
      </div>
    </main>
  );
}
