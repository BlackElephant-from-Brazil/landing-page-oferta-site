"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import BrandLockup from "./brand-lockup";

interface SiteLoaderProps {
  progress: number;
  complete: boolean;
  onModelReady: () => void;
  onHidden: () => void;
}

export default function SiteLoader({
  progress,
  complete,
  onModelReady,
  onHidden,
}: SiteLoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const onHiddenRef = useRef(onHidden);
  const onModelReadyRef = useRef(onModelReady);
  const [introReady, setIntroReady] = useState(false);

  useEffect(() => {
    onHiddenRef.current = onHidden;
    onModelReadyRef.current = onModelReady;
  }, [onHidden, onModelReady]);

  useEffect(() => {
    const readyTimer = window.setTimeout(() => {
      onModelReadyRef.current();
      setIntroReady(true);
    }, 520);

    return () => window.clearTimeout(readyTimer);
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-loader-line]",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.15,
          stagger: 0.08,
          ease: "expo.out",
        },
      );

      gsap.fromTo(
        "[data-loader-reveal]",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
        },
      );
    }, overlayRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!complete || !introReady || !overlayRef.current) return;

    const overlay = overlayRef.current;
    const timeline = gsap.timeline({
      onComplete: () => onHiddenRef.current(),
    });

    timeline
      .to("[data-loader-reveal]", {
        y: -18,
        opacity: 0,
        duration: 0.42,
        stagger: 0.035,
        ease: "power2.in",
      })
      .to(
        overlay,
        {
          yPercent: -100,
          duration: 0.72,
          ease: "expo.inOut",
        },
        "-=0.16",
      );

    return () => {
      timeline.kill();
    };
  }, [complete, introReady]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex min-h-screen items-center overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/16" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/16" />

      <div className="shell relative z-10 grid w-full gap-14 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div data-loader-reveal className="space-y-8">
          <BrandLockup />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/46">
              BlackElephant digital studio
            </p>
            <h2 className="mt-5 max-w-3xl text-[3rem] font-medium leading-[0.94] tracking-normal text-white sm:text-[5rem] lg:text-[6.4rem]">
              Loading the experience.
            </h2>
          </div>
        </div>

        <div className="space-y-8">
          <div data-loader-reveal className="grid grid-cols-3 gap-3">
            {["strategy", "design", "deploy"].map((item) => (
              <div key={item} className="border-t border-white/16 pt-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/48">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <div data-loader-reveal>
            <div className="mb-4 flex items-end justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/48">
                Progress
              </p>
              <p className="text-5xl font-medium leading-none text-brand">
                {Math.round(progress)}
                <span className="text-2xl text-white/38">%</span>
              </p>
            </div>
            <div className="space-y-2">
              {[0.42, 0.74, 1].map((scale, index) => (
                <div
                  key={scale}
                  className="h-px overflow-hidden bg-white/10"
                >
                  <div
                    data-loader-line
                    className="h-full origin-left bg-white/80"
                    style={{
                      transform: `scaleX(${Math.min(
                        progress / 100,
                        scale,
                      )})`,
                      opacity: index === 2 ? 1 : 0.36 + index * 0.18,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
