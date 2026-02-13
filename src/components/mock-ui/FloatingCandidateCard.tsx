"use client";

import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";
import { floatAnimation, floatAnimationSlow } from "@/lib/animations";

const FloatingCandidateCard = () => {
  return (
    <div className="relative h-full w-full">
      {/* Abstract blurred background circles */}
      <motion.div
        animate={floatAnimationSlow}
        className="absolute top-1/4 left-1/4 h-48 w-48 rounded-full bg-blue-200 opacity-20 blur-3xl"
      />
      <motion.div
        animate={{
          ...floatAnimation,
          y: [5, -10, 5],
        }}
        className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-purple-200 opacity-15 blur-3xl"
      />
      <motion.div
        animate={floatAnimationSlow}
        className="absolute top-1/3 right-1/3 h-40 w-40 rounded-full bg-amber-200 opacity-20 blur-3xl"
      />

      {/* Main Candidate Card */}
      <motion.div
        animate={floatAnimation}
        className="absolute top-1/2 left-1/2 w-72 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
      >
        {/* Match Badge */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            98% Match
          </span>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-text-secondary">4.9</span>
          </div>
        </div>

        {/* Avatar + Info */}
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gray text-sm font-semibold text-brand-black">
            JM
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-black">
              James Miller
            </p>
            <p className="text-xs text-text-secondary">
              Senior BMET · 12 yrs exp
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-brand-gray px-2.5 py-1 text-[11px] font-medium text-text-secondary">
            MRI Systems
          </span>
          <span className="rounded-full bg-brand-gray px-2.5 py-1 text-[11px] font-medium text-text-secondary">
            CT Scanners
          </span>
          <span className="rounded-full bg-brand-gray px-2.5 py-1 text-[11px] font-medium text-text-secondary">
            GE Healthcare
          </span>
        </div>

        {/* Video Intro Badge */}
        <div className="flex items-center gap-2 rounded-xl bg-brand-gray px-3 py-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-black">
            <Play size={12} className="ml-0.5 fill-white text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-black">
              Video Intro
            </p>
            <p className="text-[10px] text-text-secondary">2:30 min</p>
          </div>
        </div>
      </motion.div>

      {/* Secondary floating elements */}
      <motion.div
        animate={{
          y: [-5, 8, -5],
          transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-[15%] right-[10%] rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
      >
        <p className="text-xs font-semibold text-emerald-600">
          ✓ Background Verified
        </p>
      </motion.div>

      <motion.div
        animate={{
          y: [4, -6, 4],
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-[20%] left-[8%] rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
      >
        <p className="text-xs font-medium text-brand-black">
          🏆 Top 5% Candidate
        </p>
      </motion.div>
    </div>
  );
};

export default FloatingCandidateCard;
