"use client";

import { motion } from "framer-motion";
import { Unlock, ChevronRight } from "lucide-react";

type CandidateRow = {
  initials: string;
  name: string;
  role: string;
  match: number;
  isActive: boolean;
};

const candidates: CandidateRow[] = [
  {
    initials: "AR",
    name: "Alex R.",
    role: "Senior BMET",
    match: 98,
    isActive: true,
  },
  {
    initials: "SK",
    name: "Sarah K.",
    role: "Imaging Specialist",
    match: 94,
    isActive: false,
  },
  {
    initials: "DW",
    name: "David W.",
    role: "Field Engineer",
    match: 91,
    isActive: false,
  },
  {
    initials: "MP",
    name: "Maria P.",
    role: "Lab Tech Lead",
    match: 87,
    isActive: false,
  },
];

const MockCandidateList = () => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-transform hover:scale-[1.02]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold text-brand-black">
          Matched Candidates
        </span>
        <span className="rounded-full bg-brand-gray px-2.5 py-1 text-xs font-medium text-text-secondary">
          {candidates.length} found
        </span>
      </div>

      {/* Candidate Rows */}
      <div className="space-y-2">
        {candidates.map((candidate, index) => (
          <motion.div
            key={candidate.initials}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.4,
              ease: [0.25, 1, 0.5, 1],
            }}
            className={`flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${
              candidate.isActive
                ? "bg-brand-gray"
                : "hover:bg-gray-50"
            }`}
          >
            {/* Avatar */}
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                candidate.isActive
                  ? "bg-brand-black text-white"
                  : "bg-brand-gray text-brand-black"
              }`}
            >
              {candidate.initials}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-brand-black">
                {candidate.name}
              </p>
              <p className="text-xs text-text-secondary">{candidate.role}</p>
            </div>

            {/* Match % */}
            <span
              className={`shrink-0 text-xs font-semibold ${
                candidate.match >= 95
                  ? "text-emerald-600"
                  : "text-text-secondary"
              }`}
            >
              {candidate.match}%
            </span>

            {/* Action */}
            {candidate.isActive ? (
              <button
                className="flex shrink-0 cursor-pointer items-center gap-1 rounded-full bg-brand-black px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-gray-800"
                aria-label={`Unlock ${candidate.name}'s profile`}
                tabIndex={0}
              >
                <Unlock size={12} />
                Unlock
              </button>
            ) : (
              <ChevronRight
                size={16}
                className="shrink-0 text-gray-300"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MockCandidateList;
