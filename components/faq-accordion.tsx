"use client";

import { useState } from "react";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidGlassV2 } from "./liquid-glass-v2";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} data-reveal>
            <LiquidGlassV2
              variant="sidebar"
              borderRadius="1.5rem"
              enableHover={false}
              className="!cursor-default"
            >
              <div className="w-full">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-[15px] font-medium leading-snug text-white sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={clsx(
                      "flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-brand/40 bg-brand-soft"
                        : "border-white/15 bg-white/5",
                    )}
                  >
                    <Plus
                      className={clsx(
                        "size-4 transition-colors",
                        isOpen ? "text-brand" : "text-white/80",
                      )}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.34,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 text-sm leading-7 text-white/72 sm:px-6 sm:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </LiquidGlassV2>
          </div>
        );
      })}
    </div>
  );
}
