"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Globe,
  Layers3,
  LineChart,
  Lock,
  Maximize2,
  MessageCircleMore,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import BrandLockup from "@/components/brand-lockup";
import ParticleBackground from "@/components/particle-background";
import SiteLoader from "@/components/site-loader";
import FaqAccordion from "@/components/faq-accordion";
import FloatingCTA from "@/components/floating-cta";
import QuoteModal from "@/components/quote-modal";
import { LiquidGlassV2 } from "@/components/liquid-glass-v2";
import { landingContent } from "@/lib/landing-content";
import { portfolioProjects } from "@/lib/portfolio-data";
import BendSliderComponent from "@/components/BendSlider";

gsap.registerPlugin(ScrollTrigger);

const trustIcons = [Globe, BadgeCheck, Lock, ShieldCheck];

const serviceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Layers3,
};

const partnershipIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  RefreshCw,
  ShieldCheck,
  LineChart,
  MessageCircleMore,
};

const heroServiceTypes = ["Landing Page", "Site"];

const sectionIds = {
  shift: "diferencial",
  services: "servicos",
  partnership: "parceria",
  process: "processo",
  faq: "faq",
} as const;

export default function LandingPage() {
  const [fontsReady, setFontsReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [minimumTimeReached, setMinimumTimeReached] = useState(false);
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [mobileImageIndex, setMobileImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const touchStartX = useRef(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const heroPrimaryRef = useRef<HTMLButtonElement>(null);
  const finalCtaRef = useRef<HTMLButtonElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const openQuoteModal = () => setQuoteModalOpen(true);

  const progressSteps = [fontsReady, sceneReady, modelReady, minimumTimeReached];
  const progress =
    (progressSteps.filter(Boolean).length / progressSteps.length) * 100;
  const isLoaderComplete = progressSteps.every(Boolean);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => setReducedMotion(mediaQuery.matches);
    applyMotionPreference();
    mediaQuery.addEventListener("change", applyMotionPreference);

    document.fonts.ready.then(() => setFontsReady(true));
    const timeout = window.setTimeout(() => setMinimumTimeReached(true), 1000);

    return () => {
      mediaQuery.removeEventListener("change", applyMotionPreference);
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      if (!progressBarRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      progressBarRef.current.style.transform = `scaleX(${ratio})`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useLayoutEffect(() => {
    if (!loaderHidden || !mainRef.current) return;

    let mobileScrollCleanup: (() => void) | undefined;

    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set("[data-reveal]", { clearProps: "all", opacity: 1 });
        return;
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "expo.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
            },
          },
        );
      });

      const horizontalSection = document.querySelector<HTMLElement>(
        "[data-horizontal-section]",
      );
      const horizontalTrack = document.querySelector<HTMLElement>(
        "[data-horizontal-track]",
      );

      if (horizontalSection && horizontalTrack) {
        ScrollTrigger.matchMedia({
          "(min-width: 1024px)": () => {
            const progressBar = document.querySelector<HTMLElement>(
              "[data-timeline-progress]",
            );

            const getDistance = () => {
              const trackRect = horizontalTrack.getBoundingClientRect();
              return Math.max(
                0,
                trackRect.left +
                  horizontalTrack.scrollWidth -
                  window.innerWidth +
                  40,
              );
            };

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: horizontalSection,
                start: "top top",
                end: () => `+=${getDistance()}`,
                scrub: 0.8,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onToggle: (self) => {
                  document.body.toggleAttribute(
                    "data-timeline-scrolling",
                    self.isActive,
                  );
                },
                onUpdate: (self) => {
                  const p = self.progress;
                  const trackWidth = horizontalTrack.scrollWidth;
                  horizontalTrack
                    .querySelectorAll<HTMLElement>("[data-timeline-card]")
                    .forEach((card) => {
                      const threshold = card.offsetLeft / trackWidth;
                      card.classList.toggle(
                        "timeline-card--active",
                        p >= threshold - 0.02,
                      );
                    });
                },
              },
            });

            tl.to(horizontalTrack, { x: () => -getDistance(), ease: "none" });

            if (progressBar) {
              gsap.set(progressBar, { scaleX: 0 });
              tl.to(progressBar, { scaleX: 1, ease: "none" }, "<");
            }

            return () => tl.kill();
          },
        });

        const mobileScroller = horizontalTrack.parentElement as HTMLElement;
        const activateMobileCards = () => {
          if (window.innerWidth >= 1024) return;
          const scrollLeft = mobileScroller?.scrollLeft ?? 0;
          const viewWidth = mobileScroller?.clientWidth ?? window.innerWidth;
          horizontalTrack
            .querySelectorAll<HTMLElement>("[data-timeline-card]")
            .forEach((card) => {
              const threshold = Math.max(
                0,
                card.offsetLeft - viewWidth * 0.55,
              );
              card.classList.toggle(
                "timeline-card--active",
                scrollLeft >= threshold,
              );
            });
        };
        mobileScroller?.addEventListener("scroll", activateMobileCards, {
          passive: true,
        });
        mobileScrollCleanup = () =>
          mobileScroller?.removeEventListener("scroll", activateMobileCards);
      }

      [heroPrimaryRef.current, finalCtaRef.current].forEach((button) => {
        if (!button) return;
        gsap.to(button, {
          boxShadow:
            "0 0 28px rgba(57,254,21,0.18), 0 0 56px rgba(57,254,21,0.08)",
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, mainRef);

    return () => {
      context.revert();
      mobileScrollCleanup?.();
    };
  }, [loaderHidden, reducedMotion]);

  return (
    <>
      {!loaderHidden ? (
        <SiteLoader
          progress={progress}
          complete={isLoaderComplete}
          onHidden={() => setLoaderHidden(true)}
          onModelReady={() => setModelReady(true)}
        />
      ) : null}

      <ParticleBackground
        reducedMotion={reducedMotion}
        onReady={() => setSceneReady(true)}
      />

      <FloatingCTA onClick={openQuoteModal} />
      <QuoteModal open={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />

      <main ref={mainRef} className="relative z-10 overflow-hidden">
        {/* ── Header ── */}
        <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050605]/45 backdrop-blur-xl">
          <div className="shell flex items-center justify-between py-3.5">
            <BrandLockup compact />
            <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.025] p-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/60 md:flex">
              <a
                href={`#${sectionIds.shift}`}
                className="rounded-full px-3 py-2 transition hover:bg-white/[0.05] hover:text-white"
              >
                Diferencial
              </a>
              <a
                href={`#${sectionIds.services}`}
                className="rounded-full px-3 py-2 transition hover:bg-white/[0.05] hover:text-white"
              >
                Serviços
              </a>
              <a
                href={`#${sectionIds.process}`}
                className="rounded-full px-3 py-2 transition hover:bg-white/[0.05] hover:text-white"
              >
                Processo
              </a>
              <a
                href={`#${sectionIds.faq}`}
                className="rounded-full px-3 py-2 transition hover:bg-white/[0.05] hover:text-white"
              >
                FAQ
              </a>
            </nav>
            <button
              type="button"
              onClick={openQuoteModal}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition hover:border-brand/45 hover:bg-white/[0.08]"
            >
              <ArrowRight className="size-4 text-brand" />
              <span className="hidden sm:inline">Orçamento</span>
            </button>
          </div>
          <div
            ref={progressBarRef}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand/80"
            style={{ transition: "transform 80ms linear" }}
          />
        </header>

        {/* ── Hero ── */}
        <section className="relative isolate flex min-h-[calc(100svh-70px)] items-center">
          <div className="shell relative z-10 grid w-full min-w-0 items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:py-20">
            <div className="min-w-0 max-w-3xl">
              <div
                data-reveal
                className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.035] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/78 backdrop-blur-md"
              >
                <span
                  className="size-1.5 rounded-full bg-brand"
                  style={{ animation: "be-pulse-soft 2.4s ease-in-out infinite" }}
                />
                Disponível agora · até 72h
              </div>

              <h1
                data-reveal
                className="mt-7 max-w-4xl text-[2.45rem] font-medium leading-[0.94] tracking-normal text-white sm:text-[4rem] lg:text-[5.45rem]"
              >
                <span className="hero-outline">Sites</span>{" "}
                <span className="hero-highlight">premium</span> em 72h para
                marcas que precisam vender mais.
              </h1>

              <p
                data-reveal
                className="mt-6 max-w-xl font-mono text-sm leading-7 text-white/76 sm:text-base"
              >
                {landingContent.hero.subheadline}
              </p>

              <div
                data-reveal
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <button
                  ref={heroPrimaryRef}
                  type="button"
                  onClick={openQuoteModal}
                  className="group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full bg-brand px-7 py-3 text-sm font-medium text-brand-foreground shadow-[0_16px_44px_rgba(57,254,21,0.18)] transition hover:translate-y-[-1px] hover:bg-[#58ff39]"
                >
                  <span className="relative z-10">
                    {landingContent.hero.primaryCta}
                  </span>
                  <ArrowRight className="relative z-10 size-5 transition-transform group-hover:translate-x-0.5" />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
                  />
                </button>
                <a
                  href={`#${sectionIds.services}`}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/14 bg-white/[0.035] px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:border-brand/40 hover:bg-white/[0.07]"
                >
                  {landingContent.hero.secondaryCta}
                  <ChevronDown className="size-5 text-brand" />
                </a>
              </div>

              <div
                data-reveal
                className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-y border-white/12 py-5"
              >
                {[
                  ["72h", "para publicar"],
                  ["SEO", "base completa"],
                  ["A/B", "opcional"],
                ].map(([value, label]) => (
                  <div key={value} className="text-center sm:text-left sm:pr-4">
                    <p className="text-xl font-medium leading-none text-white sm:text-3xl">
                      {value}
                    </p>
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white/50 sm:text-[10px]">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Hero Card ── */}
            <div data-reveal className="relative min-w-0">
              <LiquidGlassV2
                variant="sidebar"
                borderRadius="2rem"
                enableHover={false}
                enableTilt
                className="!cursor-default"
              >
                <div className="w-full p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-6 border-b border-white/12 pb-6">
                    <p className="max-w-[12rem] font-mono text-[11px] uppercase leading-5 tracking-[0.16em] text-white/58">
                      Orçamento personalizado para o seu projeto
                    </p>
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>

                  <div className="py-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                      O que você precisa?
                    </p>
                    <div className="mt-4 flex gap-3">
                      {heroServiceTypes.map((type) => (
                        <span
                          key={type}
                          className="flex-1 inline-flex min-h-[52px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/70"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-6 max-w-sm text-2xl font-medium leading-tight tracking-normal text-white">
                      Tecnologia com identidade para marcas que precisam crescer.
                    </h3>
                  </div>

                  <p className="border-t border-white/12 pt-6 text-sm leading-7 text-white/68">
                    {landingContent.services[0].description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {landingContent.services[0].features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-sm text-white/82"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-brand-soft">
                          <Check className="size-3 text-brand" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 grid grid-cols-2 gap-2.5">
                    {landingContent.hero.trustBadges.map((badge, index) => {
                      const Icon = trustIcons[index];
                      return (
                        <div
                          key={badge}
                          className="flex min-h-[62px] items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.025] px-3 py-2.5 backdrop-blur-sm"
                        >
                          <div className="rounded-full border border-brand/20 bg-brand-soft p-1.5">
                            {Icon ? (
                              <Icon className="size-3.5 text-brand" />
                            ) : (
                              <Sparkles className="size-3.5 text-brand" />
                            )}
                          </div>
                          <span className="text-[11px] font-medium leading-tight text-white/80">
                            {badge}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </LiquidGlassV2>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/42 sm:flex"
          >
            <span>scroll</span>
            <span className="block h-8 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </section>

        {/* ── Marquee ── */}
        <section
          aria-label="Selo de confiança"
          className="marquee-shell relative overflow-hidden border-y border-white/10 bg-white/[0.01] py-5 backdrop-blur-sm"
        >
          <div
            className="marquee-track flex w-max gap-16 whitespace-nowrap px-8"
            style={{ animation: "be-marquee 34s linear infinite" }}
          >
            {Array.from({ length: 3 }).flatMap((_, group) =>
              landingContent.hero.trustBadges.map((badge, index) => (
                <div
                  key={`${group}-${badge}-${index}`}
                  className="flex shrink-0 items-center gap-6 font-mono text-[12px] uppercase tracking-[0.18em] text-white/62"
                >
                  <span className="text-white/28">/</span>
                  {badge}
                </div>
              )),
            )}
          </div>
        </section>

        {/* ── Diferencial ── */}
        <section id={sectionIds.shift} className="section-band">
          <div className="shell">
            <div className="grid min-w-0 gap-14 lg:grid-cols-[1.05fr_0.95fr]">
              <div data-reveal className="min-w-0">
                <span className="section-kicker">
                  <Sparkles className="size-3.5 text-brand" />
                  Diferencial
                </span>
                <h2 className="section-title mt-6">
                  Seu digital precisa transmitir o tamanho real da sua empresa.
                </h2>
                <p className="section-copy mt-5">
                  O problema não é só design. É percepção, confiança e clareza
                  comercial. A gente entrega os três num pacote só.
                </p>

                <div className="mt-10 grid gap-0 border-y border-white/12">
                  {landingContent.painPoints.map((point, index) => (
                    <div
                      key={point}
                      data-reveal
                      className="grid gap-4 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[72px_1fr]"
                    >
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
                        0{index + 1}
                      </span>
                      <p className="text-sm leading-7 text-white/72">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-w-0 space-y-4">
                {landingContent.solutions.map((solution, index) => (
                  <article
                    key={solution.title}
                    data-reveal
                    className="group border-t border-white/12 pt-6"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <span className="text-5xl font-medium leading-none text-white/16 transition group-hover:text-brand/45">
                        0{index + 1}
                      </span>
                      <div className="rounded-full bg-white/[0.035] p-2.5 text-brand">
                        {index === 0 ? (
                          <LineChart className="size-4" />
                        ) : (
                          <Layers3 className="size-4" />
                        )}
                      </div>
                    </div>
                    <h3 className="mt-6 text-2xl font-medium leading-tight tracking-normal text-white">
                      {solution.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/70">
                      {solution.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Serviços ── */}
        <section id={sectionIds.services} className="section-band-muted">
          <div className="shell">
            <div data-reveal className="section-heading-row min-w-0">
              <div className="max-w-3xl">
                <span className="section-kicker">
                  <Zap className="size-3.5 text-brand" />
                  Serviços
                </span>
                <h2 className="section-title mt-6">
                  Dois produtos. Uma missão: colocar sua marca no ar com autoridade.
                </h2>
              </div>
              <p className="max-w-md font-mono text-xs leading-6 text-white/56">
                Sites e landing pages com código próprio, visual premium e
                publicação em até 72 horas.
              </p>
            </div>

            <div className="mt-12 grid items-start gap-8 sm:grid-cols-2">
              {landingContent.services.map((service) => {
                const Icon =
                  serviceIconMap[service.iconKey] ?? Sparkles;
                return (
                  <div
                    key={service.title}
                    data-reveal
                    className="relative h-full"
                  >
                    {service.badge ? (
                      <div className="absolute left-1/2 -top-3.5 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-brand/50 bg-[#040904]/90 px-3.5 py-1.5 shadow-[0_0_18px_rgba(57,254,21,0.28)] backdrop-blur-sm sm:left-5 sm:translate-x-0">
                        <span
                          className="size-1.5 rounded-full bg-brand"
                          style={{
                            animation: "be-pulse-soft 2s ease-in-out infinite",
                          }}
                        />
                        <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                          {service.badge}
                        </span>
                      </div>
                    ) : null}
                    <LiquidGlassV2
                      variant="sidebar"
                      borderRadius="2rem"
                      enableHover={false}
                      className="h-full !cursor-default"
                    >
                      <div className="flex h-full w-full flex-col p-6 sm:p-7">
                        <div className="inline-flex w-fit rounded-2xl border border-brand/25 bg-brand-soft p-3">
                          <Icon className="size-5 text-brand" />
                        </div>
                        <h3 className="mt-5 text-xl font-medium leading-tight tracking-normal text-white">
                          {service.title}
                        </h3>
                        <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/44">
                          {service.subtitle}
                        </p>
                        <p className="mt-4 flex-1 text-sm leading-7 text-white/68">
                          {service.description}
                        </p>
                        <ul className="mt-5 space-y-2.5">
                          {service.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-xs text-white/76 sm:text-sm"
                            >
                              <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-brand-soft">
                                <Check className="size-2.5 text-brand" />
                              </span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={openQuoteModal}
                          className="group mt-6 inline-flex min-h-11 items-center justify-between gap-3 rounded-full border border-white/14 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition hover:border-brand/40 hover:bg-white/[0.08]"
                        >
                          <span>Solicitar orçamento</span>
                          <ArrowUpRight className="size-4 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                      </div>
                    </LiquidGlassV2>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Parceria ── */}
        <section id={sectionIds.partnership} className="section-band">
          <div className="shell">
            <div data-reveal className="max-w-3xl">
              <span className="section-kicker">
                <Clock3 className="size-3.5 text-brand" />
                Parceria contínua
              </span>
              <h2 className="section-title mt-6">
                Não entregamos e sumimos — somos parceiros de longo prazo.
              </h2>
              <p className="section-copy mt-5">
                Mantemos, otimizamos e evoluímos o que entregamos. Sua presença
                digital cresce junto com o negócio.
              </p>
            </div>

            <div
              data-reveal
              className="mt-12 grid gap-5 sm:grid-cols-2"
            >
              {landingContent.partnershipPillars.map((pillar) => {
                const Icon =
                  partnershipIconMap[pillar.iconKey] ?? Sparkles;
                return (
                  <LiquidGlassV2
                    key={pillar.title}
                    variant="sidebar"
                    borderRadius="1.8rem"
                    enableHover={false}
                    className="!cursor-default"
                  >
                    <div className="w-full p-6 sm:p-7">
                      <div className="inline-flex w-fit rounded-xl border border-brand/22 bg-brand-soft p-2.5">
                        <Icon className="size-4 text-brand" />
                      </div>
                      <h3 className="mt-5 text-xl font-medium leading-tight tracking-normal text-white">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/68">
                        {pillar.description}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {pillar.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[11px] text-white/64"
                          >
                            <Check className="size-3 text-brand" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </LiquidGlassV2>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Processo ── */}
        <section id={sectionIds.process} className="section-band-muted">
          <div className="shell grid min-w-0 gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div data-reveal className="min-w-0">
              <span className="section-kicker">
                <Zap className="size-3.5 text-brand" />
                Como acontece
              </span>
              <h2 className="section-title mt-6">
                Processo rápido, direto e sem fricção.
              </h2>
              <p className="section-copy mt-5">
                Tiramos o projeto do papel com clareza, ritmo e padrão premium
                do briefing à publicação.
              </p>
            </div>

            <div className="relative min-w-0 space-y-5">
              <div
                aria-hidden="true"
                className="absolute left-[26px] top-2 bottom-2 w-px bg-gradient-to-b from-brand/45 via-white/14 to-transparent"
              />
              {landingContent.process.map((step, index) => (
                <div
                  key={step.title}
                  data-reveal
                  className="relative flex items-stretch gap-5"
                >
                  <div className="relative z-10 flex size-[54px] shrink-0 items-center justify-center rounded-full border border-brand/35 bg-[#050605]/55 font-mono text-base text-brand backdrop-blur-md">
                    0{index + 1}
                  </div>
                  <LiquidGlassV2
                    variant="sidebar"
                    borderRadius="1.5rem"
                    enableHover={false}
                    className="flex-1 !cursor-default"
                  >
                    <div className="w-full p-5 sm:p-6">
                      <h3 className="text-lg font-medium tracking-normal text-white sm:text-xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/68">
                        {step.description}
                      </p>
                    </div>
                  </LiquidGlassV2>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section className="section-band" data-horizontal-section>
          <div className="shell">
            <div data-reveal className="max-w-3xl">
              <span className="section-kicker">
                <Sparkles className="size-3.5 text-brand" />
                Trajetória
              </span>
              <h2 className="section-title mt-6">
                Uma trajetória que saiu do software e chegou à expansão digital.
              </h2>
            </div>

            <div
              data-reveal
              className="timeline-scroll mt-32 overflow-x-auto lg:overflow-visible"
              aria-label="Timeline horizontal da BlackElephant"
            >
              <div
                data-horizontal-track
                className="relative flex min-w-max snap-x snap-mandatory gap-8 pr-8 will-change-transform lg:gap-80 lg:snap-none"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-[130px] z-[0] h-px bg-white/10"
                />
                <div
                  aria-hidden="true"
                  data-timeline-progress
                  className="absolute left-0 right-0 top-[130px] z-[0] h-[2px] origin-left"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, #39fe15 8%, #39fe15 85%, transparent 100%)",
                    boxShadow:
                      "0 0 6px 2px rgba(57,254,21,0.55), 0 0 20px 6px rgba(57,254,21,0.22)",
                    transform: "scaleX(0)",
                  }}
                />
                {landingContent.companyTimeline.map((item) => (
                  <article
                    key={item.year}
                    data-timeline-card
                    className="timeline-card relative w-[78vw] max-w-[420px] snap-start sm:w-[360px] lg:w-[420px]"
                  >
                    <div className="flex min-h-[260px] w-full flex-col p-6 sm:p-7">
                      <p className="text-[4rem] font-medium leading-none tracking-normal text-brand sm:text-[4.8rem]">
                        {item.year}
                      </p>
                      <h3 className="mt-7 text-2xl font-medium leading-tight tracking-normal text-white">
                        {item.label}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-white/68">
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Credibilidade ── */}
        <section className="section-band-muted">
          <div className="shell">
            <div data-reveal className="max-w-3xl">
              <span className="section-kicker">
                <BadgeCheck className="size-3.5 text-brand" />
                Credibilidade pronta
              </span>
              <h2 className="section-title mt-6">
                Estrutura pronta para receber provas sociais reais.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {landingContent.proofPlaceholders.map((item) => (
                <div key={item.title} data-reveal>
                  <LiquidGlassV2
                    variant="sidebar"
                    borderRadius="1.8rem"
                    enableHover={false}
                    className="h-full !cursor-default"
                  >
                    <div className="flex h-full w-full flex-col p-6 sm:p-7">
                      <div className="inline-flex w-fit rounded-full border border-brand/25 bg-brand-soft p-2.5">
                        <Sparkles className="size-4 text-brand" />
                      </div>
                      <h3 className="mt-6 text-lg font-medium tracking-normal text-white sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/68">
                        {item.description}
                      </p>
                    </div>
                  </LiquidGlassV2>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Portfólio ── */}
        <section className="section-band-muted">
          <div className="shell">
            <div data-reveal className="section-heading-row min-w-0">
              <div className="max-w-3xl">
                <span className="section-kicker">
                  <Layers3 className="size-3.5 text-brand" />
                  Portfólio
                </span>
                <h2 className="section-title mt-6">Trabalhos que falam por si.</h2>
              </div>
              <p className="max-w-md font-mono text-xs leading-6 text-white/56">
                Sistemas e presença digital entregues com padrão premium para
                empresas reais.
              </p>
            </div>

            {/* Desktop portfolio */}
            <div
              data-reveal
              className="relative mt-8 hidden overflow-hidden rounded-[2rem] lg:block"
            >
              <BendSliderComponent
                images={portfolioProjects[activeProject].images}
                className="h-[80vh] min-h-[420px] w-full"
              />

              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/80 via-black/30 to-transparent pb-24 pt-5">
                <div
                  className="pointer-events-auto flex gap-2 overflow-x-auto px-5"
                  style={{ scrollbarWidth: "none" }}
                >
                  {portfolioProjects.map((project, index) => (
                    <button
                      key={project.slug}
                      onClick={() => setActiveProject(index)}
                      className={`group shrink-0 flex flex-col items-center gap-2 rounded-2xl border px-5 pb-3 backdrop-blur-sm transition ${
                        project.slug === "banco-bhg" ||
                        project.slug === "solumart-servicos"
                          ? "pt-2"
                          : "pt-4"
                      } ${
                        activeProject === index
                          ? "border-brand/50 bg-brand-soft text-brand"
                          : "border-white/12 bg-white/[0.04] text-white/56 hover:border-white/24 hover:text-white/80"
                      }`}
                    >
                      <img
                        src={project.logo}
                        alt=""
                        className={`w-auto object-contain transition ${
                          project.slug === "banco-bhg" ||
                          project.slug === "solumart-servicos"
                            ? "h-7 max-w-[96px]"
                            : "h-5 max-w-[80px]"
                        } ${activeProject === index ? "opacity-100" : "opacity-50 group-hover:opacity-70"}`}
                      />
                      <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.14em]">
                        {project.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/92 via-black/55 to-transparent px-5 pb-6 pt-28">
                <div className="pointer-events-auto flex flex-col gap-4 lg:flex-row lg:items-end lg:gap-8">
                  <div className="flex shrink-0 items-center gap-3">
                    <div className="flex h-10 min-w-[68px] items-center justify-center rounded-xl border border-white/12 bg-white/[0.06] px-3 backdrop-blur-sm">
                      <img
                        src={portfolioProjects[activeProject].logo}
                        alt={portfolioProjects[activeProject].name}
                        className="max-h-6 w-auto object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {portfolioProjects[activeProject].name}
                      </p>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/48">
                        {portfolioProjects[activeProject].type}
                      </p>
                    </div>
                  </div>

                  <p className="min-w-0 flex-1 text-sm leading-6 text-white/72">
                    {portfolioProjects[activeProject].description}
                  </p>

                  <div className="flex shrink-0 flex-wrap items-center gap-3 lg:flex-col lg:items-end">
                    <div className="flex flex-wrap gap-1.5">
                      {portfolioProjects[activeProject].tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.08] px-3 py-1.5 font-mono text-[11px] text-white/72 backdrop-blur-sm"
                        >
                          <span className="size-1.5 rounded-full bg-brand/70" />
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={portfolioProjects[activeProject].link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-5 py-2.5 text-sm font-medium text-brand transition hover:bg-brand-soft/70"
                    >
                      Ver projeto
                      <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile portfolio */}
            <div data-reveal className="mt-6 lg:hidden">
              <div
                className="flex gap-2 overflow-x-auto pb-1"
                style={{ scrollbarWidth: "none" }}
              >
                {portfolioProjects.map((project, index) => (
                  <button
                    key={project.slug}
                    onClick={() => {
                      setActiveProject(index);
                      setMobileImageIndex(0);
                    }}
                    className={`shrink-0 flex items-center gap-2 rounded-full border px-3 py-2 transition ${
                      activeProject === index
                        ? "border-brand/50 bg-brand-soft text-brand"
                        : "border-white/12 bg-white/[0.04] text-white/56"
                    }`}
                  >
                    <img
                      src={project.logo}
                      alt=""
                      className={`h-4 w-auto object-contain ${activeProject === index ? "opacity-100" : "opacity-50"}`}
                    />
                    <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em]">
                      {project.name}
                    </span>
                  </button>
                ))}
              </div>

              <div
                className="relative mt-4 aspect-[16/10] overflow-hidden rounded-xl bg-[#080808]"
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  const delta =
                    touchStartX.current - e.changedTouches[0].clientX;
                  const total = portfolioProjects[activeProject].images.length;
                  if (delta > 50 && mobileImageIndex < total - 1)
                    setMobileImageIndex((i) => i + 1);
                  else if (delta < -50 && mobileImageIndex > 0)
                    setMobileImageIndex((i) => i - 1);
                }}
              >
                <img
                  src={portfolioProjects[activeProject].images[mobileImageIndex]}
                  alt=""
                  className="h-full w-full object-contain"
                />
                <button
                  onClick={() => {
                    setLightboxIndex(mobileImageIndex);
                    setLightboxOpen(true);
                  }}
                  className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg bg-black/65 text-white backdrop-blur-sm"
                  aria-label="Ampliar imagem"
                >
                  <Maximize2 className="size-4" />
                </button>
                {mobileImageIndex > 0 && (
                  <button
                    onClick={() => setMobileImageIndex((i) => i - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-lg bg-black/65 text-white backdrop-blur-sm"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                )}
                {mobileImageIndex <
                  portfolioProjects[activeProject].images.length - 1 && (
                  <button
                    onClick={() => setMobileImageIndex((i) => i + 1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-lg bg-black/65 text-white backdrop-blur-sm"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                )}
              </div>

              <p className="mt-2 text-center font-mono text-[11px] text-white/36">
                {mobileImageIndex + 1} /{" "}
                {portfolioProjects[activeProject].images.length}
              </p>

              <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 min-w-[56px] items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] px-3">
                    <img
                      src={portfolioProjects[activeProject].logo}
                      alt={portfolioProjects[activeProject].name}
                      className="max-h-5 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {portfolioProjects[activeProject].name}
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/44">
                      {portfolioProjects[activeProject].type}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-white/68">
                  {portfolioProjects[activeProject].description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {portfolioProjects[activeProject].tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-3 py-1 font-mono text-[11px] text-white/64"
                    >
                      <span className="size-1.5 rounded-full bg-brand/70" />
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={portfolioProjects[activeProject].link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-5 py-2.5 text-sm font-medium text-brand"
                >
                  Ver projeto
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id={sectionIds.faq} className="section-band">
          <div className="shell grid min-w-0 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal className="min-w-0">
              <span className="section-kicker">
                <MessageCircleMore className="size-3.5 text-brand" />
                FAQ
              </span>
              <h2 className="section-title mt-6">
                Respostas rápidas para destravar a decisão.
              </h2>
              <p className="section-copy mt-5">
                Ainda restou dúvida? Solicite um orçamento e tire todas as
                dúvidas com nosso time.
              </p>
              <button
                type="button"
                onClick={openQuoteModal}
                className="mt-7 inline-flex items-center gap-3 rounded-full border border-brand/30 bg-brand-soft px-5 py-3 text-sm font-medium text-brand transition hover:bg-brand-soft/70"
              >
                <ArrowRight className="size-4" />
                Solicitar orçamento
              </button>
            </div>
            <FaqAccordion items={landingContent.faq} />
          </div>
        </section>

        {/* ── CTA Final ── */}
        <section className="relative py-24 sm:py-32">
          <div className="shell relative z-10">
            <div data-reveal>
              <LiquidGlassV2
                variant="sidebar"
                borderRadius="2.4rem"
                enableHover={false}
                className="!cursor-default"
              >
                <div className="w-full px-6 py-12 text-center sm:px-12 sm:py-16">
                  <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
                    <Clock3 className="size-3.5" />
                    Vamos colocar no ar
                  </div>
                  <h2 className="mx-auto mt-8 max-w-4xl text-3xl font-medium leading-[1.02] tracking-normal text-white sm:text-4xl lg:text-[3.2rem]">
                    Sua empresa pode entrar no digital com mais autoridade.
                  </h2>
                  <p className="mx-auto mt-6 max-w-2xl font-mono text-sm leading-7 text-white/72 sm:text-base">
                    A BlackElephant entrega estrutura, acabamento e velocidade
                    para sua marca vender melhor — em até 72 horas.
                  </p>

                  <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button
                      ref={finalCtaRef}
                      type="button"
                      onClick={openQuoteModal}
                      className="group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full bg-brand px-7 py-3 text-sm font-medium text-brand-foreground transition hover:translate-y-[-1px] hover:bg-[#58ff39]"
                    >
                      <span className="relative z-10">
                        Solicitar um orçamento personalizado
                      </span>
                      <ArrowRight className="relative z-10 size-5 transition-transform group-hover:translate-x-0.5" />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
                      />
                    </button>
                    <div className="inline-flex min-h-12 items-center rounded-full border border-white/14 bg-white/[0.04] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/62">
                      Proposta em até 24h
                    </div>
                  </div>
                </div>
              </LiquidGlassV2>
            </div>
          </div>
        </section>

        {/* ── Lightbox ── */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/96"
            onClick={() => setLightboxOpen(false)}
          >
            <img
              src={portfolioProjects[activeProject].images[lightboxIndex]}
              alt=""
              className="max-h-[92vh] max-w-[96vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-sm"
              aria-label="Fechar"
            >
              <X className="size-5" />
            </button>
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => i - 1);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-sm"
              >
                <ChevronLeft className="size-6" />
              </button>
            )}
            {lightboxIndex <
              portfolioProjects[activeProject].images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => i + 1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-sm"
              >
                <ChevronRight className="size-6" />
              </button>
            )}
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-xs text-white/40">
              {lightboxIndex + 1} /{" "}
              {portfolioProjects[activeProject].images.length}
            </p>
          </div>
        )}

        {/* ── Footer ── */}
        <footer className="relative border-t border-white/8 py-10">
          <div className="shell flex flex-col items-center justify-between gap-4 sm:flex-row">
            <BrandLockup compact />
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/42">
              © {new Date().getFullYear()} · BlackElephant
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
