"use client";
import React from "react";
import Image from "next/image";
import logoDark from "../../assets/logo-dark.png";

export default function Header() {
  return (
    <div className="flex justify-center w-full">
      <header className="w-fit rounded-2xl z-50 py-3 px-4 bg-[#ffc8dd] fixed top-0 mt-4 z-40 flex justify-center shadow-lg">
        <Image
          src={logoDark}
          alt="Logo"
          className="h-auto max-h-14 w-auto"
          priority
        />
      </header>
    </div>
  );
}
