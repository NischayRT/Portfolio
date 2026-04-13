// app/page.js
"use client";
import { useState } from "react";
import ScrollRevealPage from "@/components/ScrollRevealPage";
import Loading from "@/components/Loading";
import Header from "@/components/Header";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loading onLoadComplete={() => setIsLoading(false)} />}
      <Header />
      <ScrollRevealPage />
    </>
  );
}