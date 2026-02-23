"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type WaitlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type UserType = "hiring" | "technician";

const WaitlistModal = ({ isOpen, onClose }: WaitlistModalProps) => {
  const [userType, setUserType] = useState<UserType>("hiring");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Close on Escape key
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userType, firstName, lastName, email, phone, company }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setCompany("");
        onClose();
      }, 2000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
          aria-label="Join the waitlist"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl md:max-w-lg"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 cursor-pointer rounded-full p-2 text-text-secondary transition-colors hover:bg-gray-100 hover:text-brand-black"
              aria-label="Close modal"
              tabIndex={0}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tighter text-brand-black">
                Join the Waitlist
              </h2>
              <p className="mt-1.5 text-sm text-text-secondary">
                Get early access to the future of field service hiring.
              </p>
            </div>

            {/* Toggle Pills */}
            <div className="mb-6 flex rounded-full bg-brand-gray p-1">
              <button
                onClick={() => setUserType("hiring")}
                className={`flex-1 cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                  userType === "hiring"
                    ? "bg-white text-brand-black shadow-sm"
                    : "text-text-secondary hover:text-brand-black"
                }`}
                aria-label="I'm hiring"
                aria-pressed={userType === "hiring"}
                tabIndex={0}
              >
                I&apos;m Hiring
              </button>
              <button
                onClick={() => setUserType("technician")}
                className={`flex-1 cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                  userType === "technician"
                    ? "bg-white text-brand-black shadow-sm"
                    : "text-text-secondary hover:text-brand-black"
                }`}
                aria-label="I'm a technician"
                aria-pressed={userType === "technician"}
                tabIndex={0}
              >
                I&apos;m a Technician
              </button>
            </div>

            {/* Form */}
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-8"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                  <span className="text-2xl" role="img" aria-label="Checkmark">
                    ✓
                  </span>
                </div>
                <p className="text-lg font-semibold text-brand-black">
                  You&apos;re on the list!
                </p>
                <p className="mt-1 text-sm text-text-secondary">
                  We&apos;ll be in touch soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1.5 block text-xs font-medium text-text-secondary"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="James"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-black outline-none transition-colors placeholder:text-gray-400 focus:border-brand-black"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1.5 block text-xs font-medium text-text-secondary"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Miller"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-black outline-none transition-colors placeholder:text-gray-400 focus:border-brand-black"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium text-text-secondary"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="james@company.com"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-black outline-none transition-colors placeholder:text-gray-400 focus:border-brand-black"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-medium text-text-secondary"
                  >
                    Mobile Number (Optional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-black outline-none transition-colors placeholder:text-gray-400 focus:border-brand-black"
                  />
                </div>

                {userType === "hiring" && (
                  <div>
                    <label
                      htmlFor="modal-company"
                      className="mb-1.5 block text-xs font-medium text-text-secondary"
                    >
                      Company Name
                    </label>
                    <input
                      id="modal-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Health Systems"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-black outline-none transition-colors placeholder:text-gray-400 focus:border-brand-black"
                    />
                  </div>
                )}

                {error && (
                  <p className="rounded-lg bg-red-50 px-4 py-2.5 text-xs text-red-600">
                    {error}
                  </p>
                )}

                {/* Context-aware subtitle */}
                <p className="text-xs text-text-secondary">
                  {userType === "hiring"
                    ? "We'll set you up with a hiring dashboard and AI tools."
                    : "We'll help you create a profile and get discovered by top employers."}
                </p>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer rounded-full bg-brand-primary py-3 text-sm font-medium text-white transition-colors hover:bg-brand-primary-dark disabled:opacity-60"
                  aria-label="Submit waitlist form"
                >
                  {isLoading ? "Submitting..." : "Get Early Access"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
