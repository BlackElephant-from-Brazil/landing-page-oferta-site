"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingCTAProps {
  onClick: () => void;
}

export default function FloatingCTA({ onClick }: FloatingCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="floating-cta"
          type="button"
          onClick={onClick}
          aria-label="Solicitar um orçamento personalizado"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
          className="floating-cta-glow fixed bottom-5 right-5 z-50 inline-flex size-14 cursor-pointer items-center justify-center rounded-full bg-brand p-0 text-sm font-medium text-brand-foreground sm:bottom-8 sm:right-8 sm:size-auto sm:h-14 sm:justify-start sm:gap-3 sm:pl-4 sm:pr-6"
        >
          <span className="relative flex size-9 items-center justify-center rounded-full bg-brand-foreground/12">
            <ArrowRight className="relative size-5" />
          </span>
          <span className="hidden sm:inline">Solicitar orçamento</span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
