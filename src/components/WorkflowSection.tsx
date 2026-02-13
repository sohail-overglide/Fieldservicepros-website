"use client";

import { motion } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/animations";
import MockJobInput from "@/components/mock-ui/MockJobInput";
import MockCandidateList from "@/components/mock-ui/MockCandidateList";

const WorkflowSection = () => {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mb-12 grid grid-cols-1 gap-6 md:mb-16 md:grid-cols-2 md:gap-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl leading-[1.1] font-semibold tracking-tighter text-brand-black md:text-5xl"
          >
            Everything in one hiring workspace
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="flex items-center text-lg leading-relaxed text-text-secondary"
          >
            Generate job listings, discover candidates, run AI vetting, and
            manage your entire pipeline — from a single, unified platform.
          </motion.p>
        </motion.div>

        {/* Bento Grid — 2 Columns */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Card 1 — AI Job Creation */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-between rounded-3xl-plus bg-brand-gray p-6 md:min-h-[500px] md:p-12"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold tracking-tight text-brand-black">
                Instant Job Creation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Describe the role, and our AI builds a complete, optimized job
                listing in seconds.
              </p>
            </div>
            <MockJobInput />
          </motion.div>

          {/* Card 2 — Direct Talent Access */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-between rounded-3xl-plus bg-brand-gray p-6 md:min-h-[500px] md:p-12"
          >
            <div className="mb-6">
              <h3 className="text-xl font-semibold tracking-tight text-brand-black">
                Direct Talent Access
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                Browse AI-matched candidates ranked by fit. Unlock profiles
                instantly, no middleman.
              </p>
            </div>
            <MockCandidateList />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkflowSection;
