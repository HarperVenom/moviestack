"use client";
import { sortTitlesByRelease } from "@/utils/sortTitlesByRelease";
import React, { useContext, useEffect, useRef, useState } from "react";
import Title from "./Title";
import { TitlesContext } from "@/services/providers/TitlesProvider";
import { filterTitles } from "@/utils/filterTitles";
import Image from "next/image";

export default function TitleList() {
  const {
    universe,
    titles,
    bannedBranchFilters,
    bannedTypeFilters,
    resetTitles,
    canShow,
  } = useContext(TitlesContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current == null) return;
    const container = containerRef.current;
    function updateWidth() {
      setContainerWidth(container.getBoundingClientRect().width);
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
      className="flex flex-col w-full mb-[50vh]"
      style={{
        gap: "clamp(0.5rem,5vw,2rem)",
      }}
    >
      <div
        className="relative rounded-md overflow-hidden shadow-lg"
        style={{
          width: `${containerWidth}px`,
          height: `${containerWidth / 3}px`,
        }}
      >
        <Image
          className="h-full object-cover saturate-[130%]"
          src={universe?.banner_url || ""}
          alt=""
          width={((320 * containerWidth) / 320) * 2}
          height={((80 * containerWidth) / 320) * 2}
          quality={100}
          loading="lazy"
        ></Image>
      </div>
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
