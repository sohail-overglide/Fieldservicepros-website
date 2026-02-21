"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";
import HeroStage from "@/components/HeroStage";

type HeroSectionProps = {
  onOpenWaitlist: () => void;
};

const HeroSection = ({ onOpenWaitlist }: HeroSectionProps) => {
  return (
    <section className="px-6 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-7xl">
        {/* Top split layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16"
        >
          {/* Left Column — Headline + CTAs */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl leading-[1.1] font-semibold tracking-tighter text-brand-black md:text-6xl lg:text-7xl">
              Bringing technology to hiring.
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenWaitlist}
                className="cursor-pointer rounded-full bg-brand-primary px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-primary-dark"
                aria-label="Get early access"
              >
                Get Early Access
              </button>
              <a
                href="https://mail.google.com/mail/?view=cm&to=info@fieldservicepros.com&su=Contact%20Sales%20Inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-200 px-7 py-3 text-sm font-medium text-brand-black transition-colors hover:bg-gray-50"
                aria-label="Contact our sales team"
              >
                Contact Sales
              </a>
            </div>
          </motion.div>

          {/* Right Column — Description */}
          <motion.div variants={fadeInUp} className="flex items-center">
            <p className="text-lg leading-relaxed text-text-secondary">
              The intelligent operating system for field service hiring. From
              AI-powered job creation to blind candidate vetting, FieldService
              Pros connects you with verified technicians — fast, fair, and
              without the noise.
            </p>
          </motion.div>
        </motion.div>

        {/* The Stage — Product Visual */}
        <HeroStage />
      </div>
    </section>
  );
};

export default HeroSection;
