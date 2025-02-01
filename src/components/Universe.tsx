"use client";

import React, { useContext, useEffect, useState } from "react";
import TitleList from "./TitleList";
import Settings from "./Settings";
import SettingsIcon from "../../public/assets/settings";
import Hidden from "../../public/assets/hidden";
import NotHidden from "../../public/assets/not-hidden";
import { TitlesContext } from "@/services/providers/TitlesProvider";

export default function Universe() {
  const { completed, filteredTitles, isHidden, setIsHidden } =
    useContext(TitlesContext);
  const [menuOpened, setMenuOpened] = useState(false);

  const filteredCompleted = completed.filter((id) =>
    filteredTitles.some((title) => title.id === id)
  );

  return (
    <main className="flex-col relative w-full mx-auto">
      <div
        className="w-[90vw] max-w-[620px] mx-auto relative"
        style={{
          marginTop: "min(calc((100vw - 90vw) / 2), 2rem)",
          marginBottom: "calc((100vw - 90vw) / 2)",
        }}
      >
        <TitleList />
      </div>

      {/* Background */}
      <div
        className="fixed top-[4.5rem] bottom-[4.5rem] w-[95vw] max-w-[800px]
        bg-custom-primary3 mix-blend-multiply opacity-90
        left-[50%] -translate-x-[50%] rounded-md transition-all"
        style={{
          opacity: menuOpened ? "" : "0",
          pointerEvents: menuOpened ? "all" : "none",
          marginLeft: "calc((100vw - 100%)/2)",
        }}
      />
      {/* Blur */}
      <div
        className="fixed top-[4.5rem] bottom-[4.5rem] w-[95vw] max-w-[800px]
        left-[50%] -translate-x-[50%] rounded-md transition-all"
        style={{
          backdropFilter: "blur(10px)",
          opacity: menuOpened ? "" : "0",
          pointerEvents: menuOpened ? "all" : "none",
          marginLeft: "calc((100vw - 100%)/2)",
        }}
      />
      <div
        className="fixed top-16 bottom-16 w-[95vw] max-w-[800px] left-1/2
         -translate-x-1/2 p-2 transition-all"
        style={{
          opacity: menuOpened ? "" : "0",
          pointerEvents: menuOpened ? "all" : "none",
          marginLeft: "calc((100vw - 100%)/2)",
        }}
      >
        <Settings />
      </div>

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
          <button
            onClick={() => setIsHidden(!isHidden)}
            className="h-full rounded aspect-square p-1"
            style={{ backgroundColor: "var(--blue3)" }}
          >
            {isHidden ? (
              <NotHidden fill="var(--text)" />
            ) : (
              <Hidden fill="var(--text)" />
            )}
          </button>

          <div
            className="w-full h-full relative rounded overflow-hidden"
            // style={{ backgroundColor: "var(--blue1)" }}
          >
            <div
              className="absolute h-full transition-all"
              style={{
                backgroundColor: "var(--text)",
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
                color: "var(--text)",
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
            <SettingsIcon fill="var(--text)" />
          </button>
        </div>
      </div>
    </main>
  );
}
