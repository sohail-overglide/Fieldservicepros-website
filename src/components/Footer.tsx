"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { fadeInUp, staggerContainer, viewportConfig } from "@/lib/animations";

type FooterLink = {
  label: string;
  href: string;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type UserType = "hiring" | "technician";

const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "AI Job Creation", href: "#" },
      { label: "Candidate Discovery", href: "#" },
      { label: "Blind Hiring", href: "#" },
      { label: "Video Intros", href: "#" },
      { label: "Vetting Engine", href: "#" },
      { label: "API", href: "#" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Enterprise", href: "#" },
      { label: "For Staffing Agencies", href: "#" },
      { label: "For OEMs", href: "#" },
      { label: "For Hospitals", href: "#" },
      { label: "For ISOs", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "https://mail.google.com/mail/?view=cm&to=info@fieldservicepros.com&su=Contact%20Inquiry" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ],
  },
];

/* --- Inline Early Access Form --- */

const FooterEarlyAccessForm = () => {
  const [userType, setUserType] = useState<UserType>("hiring");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setError("");
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      className="overflow-hidden rounded-3xl-plus bg-brand-gray"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left — Copy */}
        <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
          <h2 className="text-3xl leading-[1.1] font-semibold tracking-tighter text-brand-black md:text-4xl lg:text-5xl">
            The most intelligent hiring platform for field service
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">
            Join the waitlist and be among the first to experience AI-powered
            hiring, blind vetting, and direct access to verified technicians.
          </p>

          {/* Trust signals */}
          <div className="mt-8 flex flex-col gap-3">
            {[
              "No credit card required",
              "Early access to all features",
              "Priority onboarding support",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary">
                  <Check size={12} className="text-white" />
                </div>
                <span className="text-sm font-medium text-brand-black">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="p-8 md:p-12 lg:p-16">
          <motion.div
            layout
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col items-center py-10 text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
                  <Check size={28} className="text-brand-primary" />
                </div>
                <h3 className="text-xl font-semibold text-brand-black">
                  You&apos;re on the list!
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  We&apos;ll be in touch shortly with your early access invite.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-6 cursor-pointer text-sm font-medium text-brand-primary transition-colors hover:text-brand-primary-dark"
                  aria-label="Submit another response"
                >
                  Submit another response
                </button>
              </motion.div>
            ) : (
              <>
                {/* Toggle Pills */}
                <div className="mb-6 flex rounded-full bg-brand-gray p-1">
                  <button
                    onClick={() => setUserType("hiring")}
                    className={`flex-1 cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-all ${userType === "hiring"
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
                    className={`flex-1 cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-all ${userType === "technician"
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <motion.div layout className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="footer-firstName"
                        className="mb-1.5 block text-xs font-medium text-text-secondary"
                      >
                        First Name
                      </label>
                      <input
                        id="footer-firstName"
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
                        htmlFor="footer-lastName"
                        className="mb-1.5 block text-xs font-medium text-text-secondary"
                      >
                        Last Name
                      </label>
                      <input
                        id="footer-lastName"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Miller"
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-black outline-none transition-colors placeholder:text-gray-400 focus:border-brand-black"
                      />
                    </div>
                  </motion.div>

                  <motion.div layout>
                    <label
                      htmlFor="footer-email"
                      className="mb-1.5 block text-xs font-medium text-text-secondary"
                    >
                      Email Address
                    </label>
                    <input
                      id="footer-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="james@company.com"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-black outline-none transition-colors placeholder:text-gray-400 focus:border-brand-black"
                    />
                  </motion.div>

                  <motion.div layout>
                    <label
                      htmlFor="footer-phone"
                      className="mb-1.5 block text-xs font-medium text-text-secondary"
                    >
                      Mobile Number (Optional)
                    </label>
                    <input
                      id="footer-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-black outline-none transition-colors placeholder:text-gray-400 focus:border-brand-black"
                    />
                  </motion.div>

                  <AnimatePresence mode="popLayout">
                    {userType === "hiring" && (
                      <motion.div
                        key="company-field"
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                        className="overflow-hidden"
                      >
                        <label
                          htmlFor="footer-company"
                          className="mb-1.5 block text-xs font-medium text-text-secondary"
                        >
                          Company Name
                        </label>
                        <input
                          id="footer-company"
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Health Systems"
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-brand-black outline-none transition-colors placeholder:text-gray-400 focus:border-brand-black"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && (
                    <motion.p
                      layout
                      className="rounded-lg bg-red-50 px-4 py-2.5 text-xs text-red-600"
                    >
                      {error}
                    </motion.p>
                  )}

                  <motion.div layout>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-primary py-3 text-sm font-medium text-white transition-colors hover:bg-brand-primary-dark disabled:opacity-60"
                      aria-label="Get early access"
                    >
                      {isLoading ? "Submitting..." : "Get Early Access"}
                      {!isLoading && <ArrowRight size={16} />}
                    </button>
                  </motion.div>

                  <motion.p layout className="text-center text-xs text-text-secondary">
                    {userType === "hiring"
                      ? "We\u2019ll set you up with a hiring dashboard and AI tools."
                      : "We\u2019ll help you create a profile and get discovered by top employers."}
                  </motion.p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

/* --- Footer --- */

const Footer = () => {
  return (
    <footer id="contact" className="px-6 pt-16 pb-8">
      <div className="mx-auto max-w-7xl">
        {/* Early Access Form Section */}
        <FooterEarlyAccessForm />

        {/* Links Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="mt-16 grid grid-cols-2 gap-8 border-t border-gray-100 pt-16 md:grid-cols-5 md:gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
            <Link href="/" aria-label="FieldService Pros home">
              <Image
                src="/logo.png"
                alt="FieldService Pros"
                width={160}
                height={36}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              The intelligent OS for field service hiring.
            </p>
          </motion.div>

          {/* Link Columns */}
          {footerColumns.map((column) => (
            <motion.div key={column.title} variants={fadeInUp}>
              <h4 className="mb-4 text-sm font-semibold text-brand-black">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-text-secondary transition-colors hover:text-brand-black"
                      aria-label={link.label}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 md:flex-row">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} FieldService Pros. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
