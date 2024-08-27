"use client";
import { sortTitlesByRelease } from "@/utils/sortTitlesByRelease";
import React, { useContext, useEffect, useRef, useState } from "react";
import Title from "./Title";
import { TitlesContext } from "@/services/providers/TitlesProvider";
import { filterTitles } from "@/utils/filterTitles";

export default function TitleList() {
  const { titles, bannedBranchFilters, bannedTypeFilters, resetTitles } =
    useContext(TitlesContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current == null) return;
    const container = containerRef.current;
    function updateWidth() {
      setContainerWidth(
        container.getBoundingClientRect().width > 600
          ? 600
          : container.getBoundingClientRect().width
      );
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full ml-auto"
      style={{
        maxWidth: "600px",
        marginBottom: "25svh",
        gap: "clamp(0.5rem,5vw,2rem)",
      }}
    >
      {/* <button
        className="font-bold text-custom-text hover:underline 
      ml-auto mr-4"
        onClick={resetTitles}
      >
        RESET THE PROGRESS
      </button> */}
      {sortTitlesByRelease(
        filterTitles(titles, bannedBranchFilters, bannedTypeFilters)
      ).map((title, i) => (
        <Title
          key={title.id}
          data={title}
          width={containerWidth}
          position={i}
        ></Title>
      ))}
    </div>
  );
}
