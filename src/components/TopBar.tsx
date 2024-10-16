"use client";
import { TitlesContext } from "@/services/providers/TitlesProvider";
import Image from "next/image";
import React, { useContext, useState } from "react";
import SideBar from "./SideBar";
import CrossIcon from "../../public/assets/cross-icon";

export default function TopBar() {
  const { universe } = useContext(TitlesContext);
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      className="lg:hidden h-16 sticky top-20 
    overflow-hidden pointer-events-auto rounded-md transition-all flex flex-col "
      style={{
        height: isOpen ? "calc(100vh - 8rem)" : "",
        transitionDuration: "0.5s",
      }}
    >
      <button
        className={`${
          isOpen ? "opacity-0 " : "opacity-100 "
        } absolute w-full h-16 text-xl z-10
    font-black text-white rounded-md overflow-hidden transition-all`}
        style={{
          // boxShadow: "0 0 20px rgb(0,0,0,0.5)",
          transitionDuration: "0.2s",
        }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Image
          className="absolute top-0 left-0 z-[-1]"
          src={universe?.banner_url || ""}
          alt="banner"
          width={1000}
          height={250}
        />
      </button>

      <h1
        className={`${isOpen ? "opacity-0 " : "opacity-100"}
           font-black absolute w-full h-16 pointer-events-none text-xl text-white z-20 flex items-center justify-center`}
        // style={{
        //   background: "linear-gradient(to bottom, transparent, var(--blue5))",
        // }}
      >
        {universe?.title}
      </h1>

      <div
        className={`w-full max-h-[100%] h-[calc(100% - 4rem)] grow transition-all`}
        style={{
          transitionDuration: "0.5s",
        }}
      >
        <div
          className="w-full h-full absolute z-[10] pointer-events-none transition-all"
          style={{
            background: isOpen
              ? "linear-gradient(to bottom, transparent, transparent)"
              : "linear-gradient(to bottom, transparent, var(--blue5))",
            transitionDuration: "0.5s",
          }}
        ></div>
        <button
          className="absolute w-12 right-1 top-1 z-[1] text-white"
          onClick={() => setOpen(false)}
        >
          <CrossIcon />
        </button>
        <SideBar />
      </div>
    </div>
  );
}
