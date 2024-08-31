"use client";
import React from "react";

export default function SortingSwitch() {
  return (
    <div className="text-[var(--white1)] flex flex-col gap-4">
      <h2 className="font-black">Sorting</h2>
      <div
        className="bg-[var(--blue5)] font-medium text-[var(--white1)] rounded cursor-pointer
            inline-block px-2 py-[0.5rem] m-[0.2rem] text-center"
      >
        BY RELEASE ORDER
      </div>
    </div>
  );
}
