"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

type NavbarProps = {
  onOpenWaitlist: () => void;
};

const Navbar = ({ onOpenWaitlist }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleSignUpClick = () => {
    setIsMobileMenuOpen(false);
    onOpenWaitlist();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          aria-label="FieldService Pros home"
        >
          <Image
            src="/logo.png"
            alt="FieldService Pros"
            width={180}
            height={40}
            className="h-16 w-auto"
            priority
          />
        </Link>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://mail.google.com/mail/?view=cm&to=info@fieldservicepros.com&su=Contact%20Sales%20Inquiry"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-brand-black transition-colors hover:bg-gray-50"
            aria-label="Contact sales"
          >
            Contact Sales
          </a>
          <button
            onClick={handleSignUpClick}
            className="cursor-pointer rounded-full bg-brand-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-primary-dark"
            aria-label="Get early access"
          >
            Get Early Access
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={handleToggleMenu}
          className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100 md:hidden"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          tabIndex={0}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="border-t border-gray-100 bg-white px-6 py-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              <a
                href="https://mail.google.com/mail/?view=cm&to=info@fieldservicepros.com&su=Contact%20Sales%20Inquiry"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-200 px-5 py-3 text-center text-sm font-medium text-brand-black transition-colors hover:bg-gray-50"
                aria-label="Contact sales"
              >
                Contact Sales
              </a>
              <button
                onClick={handleSignUpClick}
                className="cursor-pointer rounded-full bg-brand-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-primary-dark"
                aria-label="Get early access"
              >
                Get Early Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
