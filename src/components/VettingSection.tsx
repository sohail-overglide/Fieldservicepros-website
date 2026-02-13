"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ScanSearch, Video, UserCheck } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/animations";

/* --- Inline geometric SVG illustrations (ElevenLabs-style abstract line art) --- */

const AIScoringVisual = () => (
  <svg
    viewBox="0 0 240 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
    aria-hidden="true"
  >
    <ellipse
      cx="80"
      cy="100"
      rx="60"
      ry="80"
      stroke="#d1d5db"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
    <ellipse
      cx="160"
      cy="100"
      rx="60"
      ry="80"
      stroke="#d1d5db"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
    <path
      d="M40 100 Q80 40 120 100 Q160 160 200 100"
      stroke="#0a0a0a"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M40 100 Q80 160 120 100 Q160 40 200 100"
      stroke="#0a0a0a"
      strokeWidth="1.5"
      fill="none"
    />
    <line
      x1="120"
      y1="20"
      x2="120"
      y2="180"
      stroke="#e5e7eb"
      strokeWidth="0.5"
      strokeDasharray="2 3"
    />
    <line
      x1="30"
      y1="100"
      x2="210"
      y2="100"
      stroke="#e5e7eb"
      strokeWidth="0.5"
      strokeDasharray="2 3"
    />
    <circle cx="80" cy="65" r="3" fill="#0a0a0a" />
    <circle cx="120" cy="100" r="3" fill="#0a0a0a" />
    <circle cx="160" cy="65" r="3" fill="#0a0a0a" />
  </svg>
);

const VideoVerificationVisual = () => (
  <svg
    viewBox="0 0 240 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
    aria-hidden="true"
  >
    <rect
      x="60"
      y="40"
      width="60"
      height="60"
      stroke="#d1d5db"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
    <rect
      x="80"
      y="60"
      width="60"
      height="60"
      stroke="#d1d5db"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
    <rect
      x="100"
      y="80"
      width="60"
      height="60"
      stroke="#0a0a0a"
      strokeWidth="1.5"
    />
    <line x1="60" y1="40" x2="80" y2="60" stroke="#d1d5db" strokeWidth="0.5" />
    <line
      x1="120"
      y1="40"
      x2="140"
      y2="60"
      stroke="#d1d5db"
      strokeWidth="0.5"
    />
    <line
      x1="60"
      y1="100"
      x2="80"
      y2="120"
      stroke="#d1d5db"
      strokeWidth="0.5"
    />
    <line
      x1="120"
      y1="100"
      x2="140"
      y2="120"
      stroke="#d1d5db"
      strokeWidth="0.5"
    />
    <circle cx="130" cy="110" r="16" stroke="#0a0a0a" strokeWidth="1.5" />
    <polygon points="125,103 125,117 138,110" fill="#0a0a0a" />
  </svg>
);

const HumanVerifiedVisual = () => (
  <svg
    viewBox="0 0 240 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-full w-full"
    aria-hidden="true"
  >
    <circle
      cx="140"
      cy="100"
      r="80"
      stroke="#d1d5db"
      strokeWidth="0.5"
      strokeDasharray="3 3"
    />
    <circle
      cx="140"
      cy="100"
      r="65"
      stroke="#d1d5db"
      strokeWidth="0.5"
      strokeDasharray="3 3"
    />
    <circle
      cx="140"
      cy="100"
      r="50"
      stroke="#d1d5db"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
    <circle
      cx="140"
      cy="100"
      r="35"
      stroke="#0a0a0a"
      strokeWidth="1"
      strokeDasharray="4 4"
    />
    <circle cx="140" cy="100" r="20" stroke="#0a0a0a" strokeWidth="1.5" />
    <line
      x1="140"
      y1="100"
      x2="220"
      y2="60"
      stroke="#e5e7eb"
      strokeWidth="0.5"
    />
    <line
      x1="140"
      y1="100"
      x2="200"
      y2="140"
      stroke="#e5e7eb"
      strokeWidth="0.5"
    />
    <line
      x1="140"
      y1="100"
      x2="80"
      y2="50"
      stroke="#e5e7eb"
      strokeWidth="0.5"
    />
    <polyline
      points="132,100 138,106 150,92"
      stroke="#0a0a0a"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* --- Card Data --- */

type VettingCard = {
  title: string;
  description: string;
  Visual: React.FC;
};

const vettingCards: VettingCard[] = [
  {
    title: "AI Scoring",
    description:
      "Every candidate is scored by our AI engine across skills, experience, and cultural signals.",
    Visual: AIScoringVisual,
  },
  {
    title: "Video Verification",
    description:
      "Watch real video intros. Verify communication, professionalism, and authenticity.",
    Visual: VideoVerificationVisual,
  },
  {
    title: "Human Verified",
    description:
      "Our team manually reviews every profile to ensure quality before you ever see it.",
    Visual: HumanVerifiedVisual,
  },
];

/* --- Vetting Details Overlay --- */

type VettingStep = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  Icon: React.FC<{ size?: number; className?: string }>;
};

const vettingSteps: VettingStep[] = [
  {
    number: "1",
    title: "Automated Hard-Skill Analysis",
    subtitle: 'The "BS" Filter.',
    description:
      "Our AI doesn\u2019t just look for keywords. It cross-references a candidate\u2019s listed experience against their specific certifications (EPA 608, ASE, OSHA 10) and reported tool inventory. If the timeline and the credentials don\u2019t add up, the profile is automatically flagged for review.",
    Icon: ScanSearch,
  },
  {
    number: "2",
    title: "Behavioral Video Verification",
    subtitle: "See who you are hiring.",
    description:
      "Resumes don\u2019t show attitude. We require a 30\u201360 second unscripted video introduction from every candidate. This allows you to assess communication skills, language proficiency, and professionalism instantly\u2014before you ever spend a credit to unlock their contact info.",
    Icon: Video,
  },
  {
    number: "3",
    title: "Human-in-the-Loop Review",
    subtitle: "The Final Gatekeeper.",
    description:
      'AI is powerful, but it isn\u2019t perfect. A human industry expert reviews every profile that passes the AI scoring. We look for gaps in employment, verify realistic salary expectations, and ensure the "Field Fit" (travel tolerance, shift preferences) aligns with industry standards.',
    Icon: UserCheck,
  },
];

const VettingDetailsOverlay = ({
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
          aria-label="Vetting standard details"
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
              aria-label="Close details"
              tabIndex={0}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl leading-[1.1] font-semibold tracking-tighter text-brand-black md:text-4xl">
                The FieldService Vetting Standard
              </h2>
              <p className="mt-3 text-base leading-relaxed text-text-secondary">
                We don&apos;t just aggregate resumes. We validate talent. Here is
                the 3-layer protocol every technician must pass before they reach
                your dashboard.
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {vettingSteps.map((step) => (
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
                Result: You only see the top 10% of applicants who are actually
                ready to work.
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="mt-6 w-full cursor-pointer rounded-full border border-gray-200 py-3 text-sm font-medium text-brand-black transition-colors hover:bg-gray-50"
              aria-label="Close details"
            >
              Close Details
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* --- Main Section --- */

const VettingSection = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpenOverlay = () => setIsOverlayOpen(true);
  const handleCloseOverlay = () => setIsOverlayOpen(false);

  return (
    <>
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="mb-12 flex flex-col items-start justify-between gap-4 md:mb-16 md:flex-row md:items-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-semibold tracking-tighter text-brand-black md:text-5xl"
            >
              Safety, built in
            </motion.h2>
            <motion.button
              variants={fadeInUp}
              onClick={handleOpenOverlay}
              className="cursor-pointer rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-brand-black transition-colors hover:bg-gray-50"
              aria-label="Learn more about our vetting process"
              tabIndex={0}
            >
              Learn more
            </motion.button>
          </motion.div>

          {/* 3-Column Grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {vettingCards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                className="flex flex-col rounded-2xl-plus bg-brand-gray p-8 transition-colors hover:bg-gray-200"
              >
                {/* Geometric Visual */}
                <div className="mb-8 flex h-48 items-center justify-center">
                  <card.Visual />
                </div>

                {/* Text */}
                <h3 className="text-lg font-semibold tracking-tight text-brand-black">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Overlay */}
      <VettingDetailsOverlay
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </>
  );
};

export default VettingSection;
