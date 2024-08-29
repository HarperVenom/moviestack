"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useScroll } from "@/hooks/useScroll";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <div className="top-0 h-16 w-full">
      {/* Background */}
      <div
        className="fixed z-[1] left-0 w-full h-16 
        bg-custom-primary3 mix-blend-multiply opacity-90"
      />
      {/* Blur */}
      <div
        className="fixed z-[1] left-0 w-full h-16 
      "
        style={{ backdropFilter: "blur(10px)" }}
      />

      <nav
        className="fixed z-[1] h-16 w-full max-w-[1000px] mx-auto  
         flex items-center gap-1 px-4"
      >
        <Link className="flex items-center cursor-pointer" href={"/"}>
          <Logo />
          <h1 className="text-custom-text font-bold text-[1.2rem]">
            MovieStack
          </h1>
        </Link>
      </nav>
    </div>
  );
}
