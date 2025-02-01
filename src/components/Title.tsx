"use client";

import { TitleType } from "@/lib/types";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import Checkmark from "../../public/assets/checkmark";
import {
  getPositionFontSize,
  getTitleFontSize,
} from "@/utils/calculateFontSize";
import { getYear } from "@/utils/getYear";
import { formatTime } from "@/utils/convertTime";
import { TitlesContext } from "@/services/providers/TitlesProvider";

const initialWidth = 320;
const initialHeight = 80;

const positionWidth = 44;
const titleWidth = 80;
const checkWidth = 56;
const squareWidth = 25;

const leftBlindZoneWidth = positionWidth + titleWidth;
const rightBlindZoneWidth = checkWidth;

export default function Title({
  data,
  position,
  width,
}: {
  data: TitleType;
  position: number;
  width: number;
}) {
  const { completed, checkTitle, currentTitle, isHidden } =
    useContext(TitlesContext);
  const [isCompleted, setIsCompleted] = useState(completed.includes(data.id));

  const size = width;
  const scale = size / initialWidth;

  const hidden =
    isHidden && !(completed.includes(data.id) || currentTitle === data.id);

  useEffect(() => {
    setIsCompleted(completed.includes(data.id));
  }, [completed, data.id]);

  return (
    // CONTAINER
    <div
      className="relative rounded-md overflow-hidden shadow-lg"
      style={{
        width: `${size}px`,
        height: `${size / 4}px`,
        filter: `brightness(${isCompleted ? 0.5 : 1})`,
        transition: "transform 0.6s ease, filter 0.6s ease",
      }}
    >
      <div className="w-full h-full overflow-hidden">
        {/* SCALED CARD */}
        <div
          className="text-white left-1/2 top-1/2 overflow-hidden absolute shadow-2xl flex items-center font-bold"
          style={{
            width: `${initialWidth}px`,
            height: `${initialHeight}px`,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          {/* BANNER */}
          <Image
            className={`${
              isCompleted
                ? "brightness-75 grayscale"
                : "brightness-95 grayscale-0"
            } transition-all absolute top-0 left-0 w-full h-full 
            z-[-1] select-none saturate-[1.3] `}
            src={data.banner_url}
            alt=""
            width={initialWidth * scale * 2}
            height={initialHeight * scale * 2}
            quality={100}
            loading="lazy"
            style={{
              transitionDuration: "0.6s",
            }}
          ></Image>

          {/* LEFT TEXT FADE */}
          <div
            className="absolute z-[-1]"
            style={{
              width: `${leftBlindZoneWidth}px`,
              height: `${initialHeight}px`,
              background: `linear-gradient(to right, hsl(0, 0%, 0%, 0.7),hsl(0, 0%, 0%, 0.15) 90%, transparent)`,
            }}
          ></div>

          {/* RIGHT TEXT FADE */}
          <div
            className="right-0 absolute z-[-1]"
            style={{
              width: `${rightBlindZoneWidth}px`,
              height: `${initialHeight}px`,
              background: `linear-gradient(to left, hsl(0, 0%, 0%, 0.7),hsl(0, 0%, 0%, 0.1) 80%, transparent)`,
            }}
          ></div>

          {/* POSITION NUMBER */}
          <div
            className="flex justify-center items-center select-none  "
            style={{
              width: `${positionWidth}px`,
              fontSize: getPositionFontSize(position) + "px",
              lineHeight: getPositionFontSize(position) + "px",
            }}
          >
            {position + 1}
          </div>

          {/* TITLE + DATE + DURATION*/}
          <div
            className="flex flex-col justify-center font-bold"
            style={{ width: `${titleWidth}px` }}
          >
            <div
              className=" text-balance  pr-1"
              style={{
                fontSize: getTitleFontSize(data.title) + "px",
                lineHeight: getTitleFontSize(data.title) + 4 + "px",
              }}
            >
              {data.title}
            </div>
            <div
              className="text-[9px] text-zinc-100"
              style={{ opacity: "0.8" }}
            >
              {`${getYear(data.release_date)} • ${formatTime(data.duration)}`}
            </div>
          </div>

          {/* CHECKMARK CONTAINER */}
          <div
            className="flex justify-center ml-auto"
            style={{ width: `${checkWidth}px` }}
          >
            <button
              className="outline outline-offset-[-3px] rounded-sm outline-[3px] border-white 
      border-w cursor-pointer relative"
              style={{
                width: `${squareWidth}px`,
                height: `${squareWidth}px`,
              }}
              onClick={() => checkTitle(data.id)}
            >
              <div
                className={`${
                  isCompleted ? "w-full" : "w-0"
                } h-full transition-all overflow-hidden`}
                style={{ transitionDuration: "0.5s" }}
              >
                <div
                  className={`w-[90%] h-full transition-all flex justify-center items-end`}
                  style={{
                    width: `${squareWidth}px`,
                    height: `${squareWidth}px`,
                  }}
                >
                  <Checkmark fill="white" />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 w-full h-full bg-custom-primary flex 
      justify-center items-center text-[var(--text)] select-none transition-all"
        style={{
          fontSize: `${width / 10}px`,
          transitionDuration: "0.5s",
          opacity: hidden ? "1" : "0",
          pointerEvents: hidden ? "all" : "none",
        }}
      >
        <p className="opacity-50">?</p>
      </div>
    </div>
  );
}
