"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";

const MockJobInput = () => {
  const [typedText, setTypedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const fullText = "Senior BMET";

  // Typing animation effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 120);
      return () => clearTimeout(timeout);
    }

    // After typing completes, start "generating"
    if (typedText.length === fullText.length && !isGenerating && !isGenerated) {
      const timeout = setTimeout(() => {
        setIsGenerating(true);
        // Complete generation after 2 seconds
        setTimeout(() => {
          setIsGenerating(false);
          setIsGenerated(true);
        }, 2000);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [typedText, isGenerating, isGenerated]);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-transform hover:scale-[1.02]">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gray">
          <Sparkles size={16} className="text-brand-black" />
        </div>
        <span className="text-sm font-semibold text-brand-black">
          AI Job Builder
        </span>
      </div>

      {/* Input field */}
      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-medium text-text-secondary">
          Job Title
        </label>
        <div className="flex items-center rounded-xl border border-gray-200 bg-brand-gray px-4 py-3">
          <span className="text-sm text-brand-black">
            {typedText}
            {typedText.length < fullText.length && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-brand-black ml-0.5 align-middle"
              />
            )}
          </span>
        </div>
      </div>

      {/* Generate Button */}
      <button
        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
          isGenerated
            ? "bg-emerald-50 text-emerald-600"
            : isGenerating
              ? "bg-brand-black text-white"
              : "bg-brand-black text-white"
        }`}
        aria-label="Generate job listing"
        tabIndex={0}
      >
        {isGenerated ? (
          <>
            <Check size={16} />
            Generated
          </>
        ) : isGenerating ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={16} />
            </motion.div>
            Generating...
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Generate Job Listing
          </>
        )}
      </button>

      {/* Generated preview items */}
      {isGenerated && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="mt-4 space-y-2"
        >
          <div className="rounded-lg bg-brand-gray px-3 py-2">
            <p className="text-[11px] font-medium text-text-secondary">
              Experience Required
            </p>
            <p className="text-xs font-semibold text-brand-black">
              5+ years BMET / imaging
            </p>
          </div>
          <div className="rounded-lg bg-brand-gray px-3 py-2">
            <p className="text-[11px] font-medium text-text-secondary">
              Certifications
            </p>
            <p className="text-xs font-semibold text-brand-black">
              CBET preferred
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MockJobInput;
