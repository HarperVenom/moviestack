"use client";
import { TitlesContext } from "@/services/providers/TitlesProvider";
import React, { useContext, useEffect } from "react";

export default function FilterList() {
  const {
    branchFilters,
    typeFilters,
    bannedBranchFilters,
    bannedTypeFilters,
    checkFilter,
    switchAllFilters,
    titles,
  } = useContext(TitlesContext);

  return (
    <div className="text-[var(--white1)] flex flex-col gap-4">
      <div className="flex justify-between font-black">
        <h2>Filters</h2>
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

      <div>
        <h3 className="mb-2 font-medium">Type</h3>
        {typeFilters.map((filter, i) => (
          <button
            key={i}
            className={`${
              bannedTypeFilters.includes(filter) ? "opacity-40" : "opacity-100"
            } bg-[var(--blue5)] font-medium text-[var(--white1)] rounded text-[0.9rem] cursor-pointer
            inline-block px-2 py-[0.2rem] m-[0.2rem]`}
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
        <h3 className="mb-2 font-medium">Characters</h3>
        {branchFilters.map((filter, i) => (
          <button
            key={i}
            className={`${
              bannedBranchFilters.includes(filter)
                ? "opacity-30"
                : "opacity-100 "
            } bg-[var(--blue5)] font-medium text-[var(--white1)] rounded text-[0.9rem] cursor-pointer
            inline-block px-2 py-[0.2rem] m-[0.2rem]`}
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
  );
}
