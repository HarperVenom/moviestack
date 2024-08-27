"use client";
import { useScroll } from "@/hooks/useScroll";
import React, { useEffect, useRef, useState } from "react";

export default function SideBar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [shift, setShift] = useState<number>(0);
  const { scroll, scrollTop } = useScroll();

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      const newWidth = containerRef.current?.getBoundingClientRect().width;
      setWidth(newWidth ?? null);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  useEffect(() => {
    if (scrollTop > 80) setShift(scroll > 0 ? 80 : 0);
  }, [scroll, scrollTop]);

  return (
    <div ref={containerRef} className="w-full h-[1000px] relative">
      <div
        className="fixed h-[100px] bg-white transition-all"
        style={{
          width: `${width}px`,
          marginTop: `${-shift}px`,
          transitionDuration: "0.2s",
        }}
      ></div>
    </div>
  );
}
