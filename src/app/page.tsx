"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorkflowSection from "@/components/WorkflowSection";
import VettingSection from "@/components/VettingSection";
import BlindHiringSection from "@/components/BlindHiringSection";
import Footer from "@/components/Footer";
import WaitlistModal from "@/components/WaitlistModal";

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleOpenWaitlist = () => setIsWaitlistOpen(true);
  const handleCloseWaitlist = () => setIsWaitlistOpen(false);

  return (
    <>
      <Navbar onOpenWaitlist={handleOpenWaitlist} />
      <main>
        <HeroSection onOpenWaitlist={handleOpenWaitlist} />
        <WorkflowSection />
        <VettingSection />
        <BlindHiringSection onOpenWaitlist={handleOpenWaitlist} />
      </main>
      <Footer />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={handleCloseWaitlist} />
    </>
  );
}
