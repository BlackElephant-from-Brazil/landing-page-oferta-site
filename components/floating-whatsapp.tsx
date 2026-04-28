"use client";

import { useEffect, useState } from "react";
import { MessageCircleMore } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingWhatsAppProps {
  href: string;
  label: string;
}

export default function FloatingWhatsApp({
  href,
  label,
}: FloatingWhatsAppProps) {
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
        <motion.a
          key="floating-whatsapp"
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", damping: 24, stiffness: 280 }}
          className="floating-cta-glow fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-brand p-0 text-sm font-medium text-brand-foreground sm:bottom-8 sm:right-8 sm:size-auto sm:h-14 sm:justify-start sm:gap-3 sm:pl-4 sm:pr-6"
        >
          <span className="relative flex size-9 items-center justify-center rounded-full bg-brand-foreground/12">
            <MessageCircleMore className="relative size-5" />
          </span>
          <span className="hidden sm:inline">{label}</span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
