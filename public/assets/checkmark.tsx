import React from "react";

export default function Checkmark({ fill }: { fill: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={fill}
      strokeWidth="3"
      className="w-[90%] h-[90%]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12l4 4L20 6" />
    </svg>
  );
}
