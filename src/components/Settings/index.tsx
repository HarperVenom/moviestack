"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TitlesContext } from "@/services/providers/TitlesProvider";
import { calculateTotalDurationFormatted } from "@/utils/calculateTotalDuration";
import "./styles.css";
import FilterList from "../FilterList";
import SortingSwitch from "../SortingSwitch";

export default function Settings() {
  const { completed, universe, filteredTitles, resetTitles } =
    useContext(TitlesContext);

  return (
    <>
      {universe && (
        <aside className={`flex-col h-full overflow-hidden`}>
          <div className="h-full">
            <div className="h-full py-2">
              <div
                className="p-4 w-full h-full small-scroll max-h-full
             overflow-auto rounded-md flex flex-col"
              >
                <h1
                  className="text-[var(--white1)] font-medium text-xl text-center 
                mb-2"
                >
                  Filters
                </h1>
                <FilterList />

                <div
                  className="text-[var(--white1)] font-medium  
                items-center mt-12 gap-4 flex flex-col"
                >
                  <div className="flex flex-col justify-center items-center ">
                    <p>Total number of titles:</p>
                    <div className="text-4xl p-1 text-white">
                      {filteredTitles.length}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center">
                    <p>Total duration:</p>
                    <div className="text-4xl p-1 text-white">
                      {calculateTotalDurationFormatted(filteredTitles)}
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-center pt-12 mt-auto">
                  <button
                    className="font-normal opacity-50 text-[var(--white1)] 
                  hover:underline hover:opacity-100"
                    onClick={resetTitles}
                  >
                    Reset the progress
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="bg-[var(--blue4)] p-4 rounded-md">
                <div className="text-white font-black text-[1.3rem] w-full flex flex-col mb-4">
                  {universe.title}
                </div>
                <div className="text-[rgb(255,255,255,0.7)] text-[0.9rem]">
                  {universe.description}
                </div>
              </div> */}

            {/* <SortingSwitch /> */}

            {/* <div className="bg-[var(--blue4)] rounded-md cursor-default select-none"></div> */}
          </div>

          {/* <div
            className="bg-[var(--blue4)] p-4 px-8 text-white font-black flex flex-col items-center gap-4"
            style={{
              boxShadow: "0 0 20px rgb(0,0,0,0.5)",
            }}
          >
            {/* <div className="flex items-baseline gap-1 text-[1.1rem]">
              <h2 className="text-center text-[var(--white1)] font-medium">
                Total duration:
              </h2>
              <span className="text-[1.5rem]">
                {calculateTotalDuration(filteredtitles)}
              </span>
            </div> 
            <div className="h-3 w-full bg-[var(--blue6)] rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all"
                style={{
                  transitionDuration: "0.5s",
                  width: `${(completed.length / filteredtitles.length) * 100}%`,
                }}
              ></div>
            </div>
            <
          </div> */}
        </aside>
      )}
    </>
  );
}
