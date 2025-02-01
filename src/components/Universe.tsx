"use client";

import React, { useContext, useEffect, useState } from "react";
import TitleList from "./TitleList";
import SideBar from "./SideBar";
import Settings from "../../public/assets/settings";
import { TitlesContext } from "@/services/providers/TitlesProvider";

export default function Universe() {
  const { completed, filteredTitles } = useContext(TitlesContext);
  const [menuOpened, setMenuOpened] = useState(false);

  const filteredCompleted = completed.filter((id) =>
    filteredTitles.some((title) => title.id === id)
  );

  return (
    <main className="flex-col relative w-full mx-auto">
      <div
        className="w-[90vw] max-w-[700px] mx-auto relative"
        style={{
          marginTop: "min(calc((100vw - 90vw) / 2), 2rem)",
          marginBottom: "calc((100vw - 90vw) / 2)",
        }}
      >
        <TitleList />
      </div>

      {menuOpened ? (
        <>
          {/* Background */}
          <div
            className="fixed top-[4.5rem] bottom-[4.5rem] w-[95vw] max-w-[800px]
        bg-custom-primary3 mix-blend-multiply opacity-90
        left-1/2 -translate-x-1/2 rounded-md"
          />
          {/* Blur */}
          <div
            className="fixed top-[4.5rem] bottom-[4.5rem] w-[95vw] max-w-[800px]
        left-1/2 -translate-x-1/2 rounded-md"
            style={{ backdropFilter: "blur(10px)" }}
          />
          <div
            className="fixed top-16 bottom-16 w-[95vw] max-w-[800px] left-1/2
         -translate-x-1/2 p-2"
          >
            <SideBar />
          </div>
        </>
      ) : null}

      <div
        className="fixed left-0 bottom-0 w-full h-16 bg-custom-primary3
      mix-blend-multiply opacity-90"
      ></div>
      <div
        className="fixed left-0 bottom-0 w-screen h-16 
      "
        style={{
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="m-auto max-w-[600px] w-full h-full flex 
        items-center p-3 px-4 justify-center gap-2"
        >
          <div
            className="w-full h-full relative rounded overflow-hidden"
            style={{ backgroundColor: "var(--blue3)" }}
          >
            <div
              className="absolute h-full bg-white transition-all"
              style={{
                transitionDuration: "0.5s",
                width: `${
                  filteredTitles.length == 0
                    ? 0
                    : (filteredCompleted.length / filteredTitles.length) * 100
                }%`,
              }}
            ></div>
            <p
              className="font-bold text-2xl w-full h-full
          flex justify-center items-center mix-blend-difference"
              style={{
                color: "var(--white1)",
              }}
            >
              {`${Math.round(
                filteredTitles.length == 0
                  ? 0
                  : (filteredCompleted.length / filteredTitles.length) * 100
              )}%`}
            </p>
          </div>

          <button
            onClick={() => {
              if (!menuOpened) {
                document.body.style.overflow = "hidden";
              } else {
                document.body.style.overflow = "";
              }
              setMenuOpened(!menuOpened);
            }}
            className="h-full rounded aspect-square p-1"
            style={{ backgroundColor: "var(--blue3)" }}
          >
            <Settings fill="var(--white1)" />
          </button>
        </div>
      </div>
    </main>
  );
}
