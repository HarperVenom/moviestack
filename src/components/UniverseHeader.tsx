"use client";

import React, { useContext } from "react";
import { calculateTotalDuration } from "@/utils/calculateTotalDuration";
import { TitlesContext } from "@/services/providers/TitlesProvider";
import TitleList from "./TitleList";
import Image from "next/image";

export default function UniverseHeader() {
  const { universe, filteredTitles: filteredtitles } =
    useContext(TitlesContext);

  return (
    <>
      {universe && (
        <div className="text-white flex flex-col items-center h-full">
          <div className="w-full my-8">
            <div className="ml-auto w-[90%] h-full gap-4 flex-col items-center">
              {/* <div
                className="col-span-2 bg-[var(--primary-brighter)] w-full flex flex-col gap-8 pb-16"
                style={{ boxShadow: "0 0 10px rgb(0 0 0 / 0.8)" }}
              >
                <Image
                  className="saturate-[1.3]"
                  src={universe.banner_url}
                  alt=""
                  width={1200}
                  height={400}
                  quality={100}
                ></Image>
                <div
                  className="px-8 sm:px-16 font-black text-[1.5rem] leading-[2rem] sm:text-[2.5rem] sm:leading-[3rem] 
                text-center w-full flex flex-col items-center"
                >
                  {universe.title}
                </div>
                <div className="px-8 sm:px-16 text-[rgb(255,255,255,0.8)]">
                  {universe.description}
                </div>
              </div> */}

              <div
                className="fixed bg-[var(--primary-brighter)] gap-4 font-bold text-sm leading-relaxed p-8 grid grid-cols-1 sm:grid-cols-2 w-full"
                style={{ boxShadow: "0 0 10px rgb(0 0 0 / 0.8)" }}
              >
                <button
                  className="sm:col-span-2 text-2xl text-custom-text border-custom-text py-[1rem]"
                  style={{
                    background:
                      "linear-gradient(to right, var(--background), transparent)",
                    boxShadow: "0 0 10px rgb(0,0,0,0.8)",
                  }}
                >
                  FILTER
                </button>
                <button
                  className="sm:col-span-2 mb-4 text-2xl text-custom-text border-custom-text py-[1rem]"
                  style={{
                    background:
                      "linear-gradient(to left, var(--background), transparent)",
                    boxShadow: "0 0 10px rgb(0,0,0,0.8)",
                  }}
                >
                  [RELEASE ORDER]
                </button>

                <div
                  className="min-h-[8rem] p-3 w-full flex flex-col items-center bg-primary-darker border-custom-text"
                  style={{ boxShadow: "0 0 10px rgb(0,0,0,0.5) inset" }}
                >
                  <h2 className="text-custom-text w-full border-custom-text opacity-80">
                    TOTAL NUMBER OF TITLES:
                  </h2>
                  <div className="text-[2rem] sm:text-[3rem] font-black text-center py-2">
                    {filteredtitles.length}
                  </div>
                </div>

                <div
                  className="min-h-[8rem] p-3 w-full flex flex-col items-center bg-primary-darker border-custom-text"
                  style={{ boxShadow: "0 0 10px rgb(0,0,0,0.5) inset" }}
                >
                  <h2 className="text-custom-text w-full border-custom-text opacity-80">
                    TOTAL DURATION:
                  </h2>
                  <div className="m-auto text-[1.6rem] sm:text-[2rem] font-black text-center py-2">
                    {calculateTotalDuration(filteredtitles)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TitleList />
        </div>
      )}
    </>
  );
}
