import React from "react";
import TitleList from "./TitleList";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

export default function Universe() {
  return (
    <main className="flex py-4 lg:px-8 relative w-full max-w-[1100px] mx-auto">
      <div className="lg:block w-[40%] hidden pr-8">
        <div className="sticky top-24" style={{ height: "calc(100vh - 8rem)" }}>
          <SideBar />
        </div>
      </div>

      <div className="lg:w-[60%] w-[90%] max-w-[800px] mx-auto relative">
        <div className="z-10 absolute top-0 left-0 h-full w-full pointer-events-none">
          <TopBar />
        </div>
        <div className="h-20 lg:hidden w-full "></div>
        <TitleList />
      </div>
    </main>
  );
}
