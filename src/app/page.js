"use client";
import { useState } from "react";
import ScrollRevealPage from "@/components/ScrollRevealPage";
import Loading from "@/components/Loading";
import Header from "@/components/Header";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* 1. LOADING SCREEN 
        We keep it mounted while loading. It has z-index 9999, 
        so it sits ON TOP of the content below.
      */}
      {isLoading && <Loading onLoadComplete={() => setIsLoading(false)} />}

      {/* 2. MAIN CONTENT
        This is rendered immediately (in the background). 
        When the loading "curtains" open, this will be visible underneath.
      */}
      <Header />
      <ScrollRevealPage />
    </>
  );
}
