'use client';

import Sidebar from "@/components/common/sidebar";
import Header from "@/components/common/header";
import MainContent from "@/components/token-creator/mainContent";

export default function TokenCreator() {
  return (
    <div className="flex bg-background_secondary h-screen overflow-hidden text-secondary font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <MainContent/>
      </div>
    </div>
  );
}