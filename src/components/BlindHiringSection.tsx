"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/animations";
import { EyeOff, Lock, X, ShieldOff, LayoutGrid, Unlock } from "lucide-react";

type BlindHiringSectionProps = {
  onOpenWaitlist: () => void;
};

/* --- Blind Hiring Details Overlay --- */

type BlindHiringStep = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  Icon: React.FC<{ size?: number; className?: string }>;
};

const blindHiringSteps: BlindHiringStep[] = [
  {
    number: "1",
    title: "The Anonymization Protocol",
    subtitle: "Removing the Bias Markers.",
    description:
      "Our engine automatically redacts personally identifiable information (PII)\u2014including names, headshots, age indicators, and gender\u2014from the initial search results. This forces the evaluation to focus strictly on what matters: the candidate\u2019s certifications, tool inventory, and field experience.",
    Icon: ShieldOff,
  },
  {
    number: "2",
    title: "Standardized Skill Taxonomy",
    subtitle: "Comparing Apples to Apples.",
    description:
      'Instead of reading formatted resumes where design hides incompetence, you view candidates through a standardized data grid. We structure every profile identically, allowing you to instantly compare "EPA 608" status or "Years of Tenure" across multiple candidates without distraction.',
    Icon: LayoutGrid,
  },
  {
    number: "3",
    title: "The Integrity Unlock",
    subtitle: "Commit to the Competence.",
    description:
      'The "Unlock" button is more than a transaction; it is a commitment. By requiring a credit to reveal the identity, we ensure that you are selecting the candidate based 100% on their fit for the job, ensuring a higher response rate and a more professional engagement.',
    Icon: Unlock,
  },
];

const BlindHiringOverlay = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
          onClick={handleOverlayClick}
          role="dialog"
          aria-modal="true"
          aria-label="Blind hiring methodology details"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl md:p-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 cursor-pointer rounded-full p-2 text-text-secondary transition-colors hover:bg-gray-100 hover:text-brand-black"
              aria-label="Close analysis"
              tabIndex={0}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl leading-[1.1] font-semibold tracking-tighter text-brand-black md:text-4xl">
                The Merit-First Methodology
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                Traditional hiring is riddled with unconscious bias. We have
                re-engineered the discovery process to remove demographic
                &ldquo;noise&rdquo; and amplify the technical
                &ldquo;signal.&rdquo;
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {blindHiringSteps.map((step) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: Number(step.number) * 0.1,
                    duration: 0.4,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  className="rounded-2xl bg-brand-gray p-6"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <step.Icon size={20} className="text-brand-black" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold tracking-tight text-brand-black">
                        {step.number}. {step.title}
                      </h3>
                      <p className="text-sm font-medium text-brand-primary">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 rounded-2xl border border-gray-100 bg-brand-gray p-5 text-center">
              <p className="text-sm font-semibold text-brand-black">
                Blind hiring increases the likelihood of finding a top-tier
                technician by 40% by expanding the talent pool beyond visual
                biases.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="mt-6 w-full cursor-pointer rounded-full border border-gray-200 py-3 text-sm font-medium text-brand-black transition-colors hover:bg-gray-50"
              aria-label="Close analysis"
            >
              Close Analysis
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* --- Main Section --- */

const BlindHiringSection = ({ onOpenWaitlist }: BlindHiringSectionProps) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpenOverlay = () => setIsOverlayOpen(true);
  const handleCloseOverlay = () => setIsOverlayOpen(false);

  return (
    <>
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16"
          >
            {/* Left — Text Content */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl leading-[1.1] font-semibold tracking-tighter text-brand-black md:text-5xl">
                Research that redefines human hiring interaction
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                Our blind hiring engine removes names, photos, age, and gender
                from candidate profiles during the initial review. You evaluate
                pure skill and experience — nothing else. When you&apos;re ready,
                unlock the full identity with a single click.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenWaitlist}
                  className="cursor-pointer rounded-full bg-brand-primary px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-primary-dark"
                  aria-label="Get early access to blind hiring"
                >
                  Get Early Access
                </button>
                <button
                  onClick={handleOpenOverlay}
                  className="flex cursor-pointer items-center gap-1.5 bg-transparent text-sm font-medium text-brand-black transition-colors hover:text-text-secondary"
                  aria-label="Learn more about blind hiring"
                  tabIndex={0}
                >
                  Learn more
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </motion.div>

            {/* Right — Blurred Avatar Visual */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center rounded-3xl-plus bg-brand-gray p-6 md:h-[500px] md:p-12"
            >
              <div className="flex flex-col items-center gap-6">
                {/* Blurred Avatar Circle */}
                <div className="relative">
                  {/* Outer ring */}
                  <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-dashed border-gray-300 md:h-52 md:w-52">
                    {/* Blurred avatar */}
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 blur-xl md:h-40 md:w-40" />

                    {/* Lock icon overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                        <EyeOff size={24} className="text-brand-black" />
                      </div>
                    </div>
                  </div>

                  {/* "Hidden" badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.4,
                      duration: 0.4,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    className="absolute -right-4 -bottom-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm"
                  >
                    <div className="flex items-center gap-1.5">
                      <Lock size={12} className="text-text-secondary" />
                      <span className="text-xs font-semibold text-brand-black">
                        HIDDEN PROFILE
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Caption */}
                <p className="max-w-xs text-center text-sm leading-relaxed text-text-secondary">
                  Identity is protected until you unlock. Evaluate skills first,
                  meet the person after.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overlay */}
      <BlindHiringOverlay
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </>
  );
};

export default BlindHiringSection;
