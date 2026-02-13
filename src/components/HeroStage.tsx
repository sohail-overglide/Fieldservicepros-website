"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scaleIn, viewportConfig } from "@/lib/animations";

const HeroStage = () => {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="relative mt-16 w-full overflow-hidden rounded-3xl-plus bg-brand-gray p-4 md:p-6"
    >
      {/* Dashboard screenshot with breathing float */}
      <motion.div
        animate={{
          y: [-6, 6, -6],
          scale: [1, 1.01, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      >
        <Image
          src="/dashboard-preview.png"
          alt="FieldService Pros dashboard showing job postings, candidate matches, and hiring analytics"
          width={2048}
          height={1024}
          className="h-auto w-full object-cover"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroStage;
