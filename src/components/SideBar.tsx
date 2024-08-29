"use client";
import { useScroll } from "@/hooks/useScroll";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TitlesContext } from "@/services/providers/TitlesProvider";
import { calculateTotalDuration } from "@/utils/calculateTotalDuration";

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
          className="self-start sticky top-24 flex flex-col h-fit bg-[var(--primary-brighter)] overscroll-none
             overflow-auto shadow-lg rounded-md"
          style={{ maxHeight: "calc(100vh - 8rem)" }}
        >
          <Image
            className="saturate-[1.3] sticky top-0 mb-4"
            src={universe.banner_url}
            alt=""
            width={1200}
            height={400}
            quality={100}
          ></Image>
          <div
            className="text-white px-8 font-black text-[1.3rem]
                text-center w-full flex flex-col items-center mb-2"
          >
            {universe.title}
          </div>
          <div className="px-8 text-[0.9rem] text-[rgb(255,255,255,0.8)]">
            {universe.description}
          </div>

          <div className="w-full text-white flex flex-col items-center">
            <button
              className="text-2xl text-custom-text border-custom-text py-[1rem]"
              style={{
                background:
                  "linear-gradient(to right, var(--background), transparent)",
                boxShadow: "0 0 10px rgb(0,0,0,0.8)",
              }}
            >
              FILTER
            </button>
            <button
              className="mb-4 text-2xl text-custom-text border-custom-text py-[1rem]"
              style={{
                background:
                  "linear-gradient(to left, var(--background), transparent)",
                boxShadow: "0 0 10px rgb(0,0,0,0.8)",
              }}
            >
              [RELEASE ORDER]
            </button>

            <div
              className="w-full flex flex-col items-center border-custom-text"
              // style={{ boxShadow: "0 0 10px rgb(0,0,0,0.5) inset" }}
            >
              <h2 className="text-custom-text w-full border-custom-text opacity-80">
                TOTAL NUMBER OF TITLES:
              </h2>
              <div className="text-[2rem] font-black text-center py-2">
                {filteredtitles.length}
              </div>
            </div>

            <div
              className="w-full flex flex-col items-center border-custom-text"
              // style={{ boxShadow: "0 0 10px rgb(0,0,0,0.5) inset" }}
            >
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
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
