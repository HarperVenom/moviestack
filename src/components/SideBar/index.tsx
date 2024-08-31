"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TitlesContext } from "@/services/providers/TitlesProvider";
import { calculateTotalDuration } from "@/utils/calculateTotalDuration";
import "./styles.css";
import FilterList from "../FilterList";
import SortingSwitch from "../SortingSwitch";

export default function SideBar() {
  const {
    universe,
    filteredTitles: filteredtitles,
    resetTitles,
  } = useContext(TitlesContext);

  return (
    <>
      {universe && (
        <aside
          className={`self-start sticky top-24 flex flex-col h-fit
            shadow-lg rounded-md overflow-hidden bg-[var(--blue3)]`}
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        >
          <Image
            className="saturate-[1.3] shadow-xl"
            src={universe.banner_url}
            alt=""
            width={1200}
            height={400}
            quality={100}
          ></Image>

          <div className="small-scroll overflow-auto overscroll-none">
            <div className="flex flex-col px-2 py-4 gap-4">
              <div className="bg-[var(--blue4)] p-4 rounded-md">
                <div className="text-white font-black text-[1.3rem] w-full flex flex-col mb-4">
                  {universe.title}
                </div>
                <div className="text-[rgb(255,255,255,0.7)] text-[0.9rem]">
                  {universe.description}
                </div>
              </div>

              <div className="bg-[var(--blue4)] p-4 rounded-md cursor-default select-none">
                <FilterList />
              </div>

              <div className="bg-[var(--blue4)] p-4 rounded-md cursor-default select-none">
                <SortingSwitch />
              </div>

              {/* <div className="w-full flex flex-col items-center border-custom-text">
                <h2 className="text-custom-text w-full border-custom-text opacity-80">
                  TOTAL NUMBER OF TITLES:
                </h2>
                <div className="text-[2rem] font-black text-center py-2">
                  {filteredtitles.length}
                </div>
              </div>

              <div className="w-full flex flex-col items-center border-custom-text">
                <h2 className="text-custom-text w-full border-custom-text opacity-80">
                  TOTAL DURATION:
                </h2>
                <div className="m-auto text-[1.6rem] font-black text-center py-2">
                  {calculateTotalDuration(filteredtitles)}
                </div>
              </div>

              <button
                className="font-bold text-custom-text hover:underline 
      ml-auto mr-4 "
                onClick={resetTitles}
              >
                RESET THE PROGRESS
              </button>*/}
            </div>
          </div>
          <div
            className="bg-[var(--blue4)] p-4 text-white font-black flex flex-col items-center gap-4"
            style={{
              boxShadow: "0 0 20px rgb(0,0,0,0.3)",
            }}
          >
            <div className="flex items-baseline gap-1 text-[1.1rem]">
              <h2 className="text-center text-[var(--white1)] font-medium">
                Total duration:
              </h2>
              <span className="text-[1.5rem]">
                {calculateTotalDuration(filteredtitles)}
              </span>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
