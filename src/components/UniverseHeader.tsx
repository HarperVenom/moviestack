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
      {/* {universe && (
        
      )} */}
    </>
  );
}
