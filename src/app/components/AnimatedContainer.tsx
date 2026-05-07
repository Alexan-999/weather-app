"use client";

import { ReactNode } from "react";

export default function AnimatedContainer({ show, children }: { show: boolean; children: ReactNode }) {
  return (
    <div
      className={`
        transition-all duration-500 ease-out
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
    >
      {children}
    </div>
  );
}