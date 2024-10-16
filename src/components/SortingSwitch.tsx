"use client";
import React, { useRef, useState } from "react";

export default function SortingSwitch() {
  const [menuOpened, setMenuOpened] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  function handleOpenMenu() {
    if (!contentRef.current) return;
    setMenuOpened((prev) => !prev);
  }

  return (
    <div className="text-[var(--white1)] flex flex-col">
      <button
        className="w-full font-black flex justify-between rounded-md items-center p-4 hover:backdrop-brightness-125"
        onClick={handleOpenMenu}
      >
        <h2>Sorting</h2>
        <div className="h-4 aspect-square relative">
          <div className="top-1/2 -translate-y-1/2 absolute bg-[var(--white1)] w-full h-[2.5px] rounded-full" />
          <div
            className={`${
              menuOpened ? "opacity-0" : "opacity-100"
            } transition-all left-1/2 -translate-x-1/2 absolute bg-[var(--white1)] w-[2.5px] h-full rounded-full`}
          />
        </div>
      </button>
      <div
        className="overflow-hidden transition-all"
        style={{
          transitionDuration: "0.5s",
          maxHeight: menuOpened
            ? `${contentRef.current?.getBoundingClientRect().height}px`
            : "0px",
        }}
      >
        <div ref={contentRef} className="p-4 flex">
          <button
            className="w-full bg-[var(--blue5)] font-medium text-[var(--white1)] rounded cursor-pointer
            inline-block px-2 py-[0.5rem] m-[0.2rem] text-center"
          >
            By Release Order
          </button>
        </div>
      </div>
    </div>
  );
}
