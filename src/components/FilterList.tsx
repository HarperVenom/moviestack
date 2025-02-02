"use client";
import { TitlesContext } from "@/services/providers/TitlesProvider";
import React, { useContext, useEffect, useRef, useState } from "react";

export default function FilterList() {
  const [menuOpened, setMenuOpened] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const {
    branchFilters,
    typeFilters,
    bannedBranchFilters,
    bannedTypeFilters,
    checkFilter,
    switchAllFilters,
    titles,
  } = useContext(TitlesContext);

  function handleOpenMenu() {
    if (!contentRef.current) return;
    setMenuOpened((prev) => !prev);
  }

  return (
    <div className="text-[var(--white1)] flex flex-col transition-all">
      {/* <button
        className="w-full font-black flex justify-between rounded-md items-center p-4 hover:backdrop-brightness-125"
        onClick={handleOpenMenu}
      >
        <h2>Filters</h2>
        <div className="h-4 aspect-square relative">
          <div className="top-1/2 -translate-y-1/2 absolute bg-[var(--white1)] w-full h-[2.5px] rounded-full" />
          <div
            className={`${
              menuOpened ? "opacity-0" : "opacity-100"
            } transition-all left-1/2 -translate-x-1/2 absolute bg-[var(--white1)] w-[2.5px] h-full rounded-full`}
          />
        </div>
      </button> */}

      <div
        className="overflow-hidden transition-all"
        // style={{
        //   transitionDuration: "0.5s",
        //   maxHeight: menuOpened
        //     ? `${contentRef.current?.getBoundingClientRect().height}px`
        //     : "0px",
        // }}
      >
        <div
          ref={contentRef}
          className={`flex flex-col gap-4 overflow-hidden transition-all`}
        >
          <div>
            <h3 className="mb-2 font-medium">Type</h3>
            {typeFilters.map((filter, i) => (
              <button
                key={i}
                className={`${
                  bannedTypeFilters.includes(filter)
                    ? "opacity-40"
                    : "opacity-100"
                } bg-[var(--blue5)] font-medium text-[var(--white1)] rounded text-[0.9rem] cursor-pointer
            inline-block px-2 py-[0.2rem] m-[0.2rem] hover:brightness-125`}
                style={{
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
                onClick={() => checkFilter(filter, "type")}
              >
                {filter}
              </button>
            ))}
          </div>

          <div>
            <div className="flex justify-between mb-2 font-medium">
              <h3>Characters</h3>
              <div className="flex gap-2">
                <button
                  className="cursor-pointer hover:underline"
                  onClick={() => switchAllFilters(true)}
                >
                  Show All
                </button>
                /
                <button
                  className="cursor-pointer hover:underline"
                  onClick={() => switchAllFilters(false)}
                >
                  Hide All
                </button>
              </div>
            </div>

            {branchFilters.map((filter, i) => (
              <button
                key={i}
                className={`${
                  bannedBranchFilters.includes(filter)
                    ? "opacity-30"
                    : "opacity-100 "
                } bg-[var(--blue5)] font-medium text-[var(--white1)] rounded text-[0.9rem] cursor-pointer
            inline-block px-2 py-[0.2rem] m-[0.2rem] hover:brightness-125`}
                style={{
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                }}
                onClick={() => checkFilter(filter, "branch")}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
