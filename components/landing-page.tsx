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
  Clock3,
  Globe,
  Layers3,
  LineChart,
  Lock,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import BrandLockup from "@/components/brand-lockup";
import ParticleBackground from "@/components/particle-background";
import SiteLoader from "@/components/site-loader";
import FaqAccordion from "@/components/faq-accordion";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { LiquidGlassV2 } from "@/components/liquid-glass-v2";
import { landingContent } from "@/lib/landing-content";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { portfolioProjects } from "@/lib/portfolio-data";
import BendSliderComponent from "@/components/BendSlider";

gsap.registerPlugin(ScrollTrigger);

const trustIcons = [Globe, BadgeCheck, Lock, ShieldCheck];
const sectionIds = {
  shift: "diferencial",
  offers: "ofertas",
  support: "suporte",
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
  const mainRef = useRef<HTMLDivElement>(null);
  const heroPrimaryRef = useRef<HTMLAnchorElement>(null);
  const finalCtaRef = useRef<HTMLAnchorElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const whatsappLink = buildWhatsAppLink(
    landingContent.contact.whatsappNumber,
    landingContent.contact.whatsappMessage,
  );

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
            const getDistance = () => {
              const trackRect = horizontalTrack.getBoundingClientRect();
              return Math.max(0, trackRect.left + horizontalTrack.scrollWidth - window.innerWidth + 40);
            };

            const tween = gsap.to(horizontalTrack, {
              x: () => -getDistance(),
              ease: "none",
              scrollTrigger: {
                trigger: horizontalSection,
                start: "top top",
                end: () => `+=${getDistance()}`,
                scrub: 0.8,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            return () => tween.kill();
          },
        });
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

      <FloatingWhatsApp
        href={whatsappLink}
        label={landingContent.contact.whatsappLabel}
      />

      <main ref={mainRef} className="relative z-10 overflow-hidden">
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
                href={`#${sectionIds.offers}`}
                className="rounded-full px-3 py-2 transition hover:bg-white/[0.05] hover:text-white"
              >
                Ofertas
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
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition hover:border-brand/45 hover:bg-white/[0.08]"
            >
              <MessageCircleMore className="size-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
          <div
            ref={progressBarRef}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand/80"
            style={{ transition: "transform 80ms linear" }}
          />
        </header>

        <section className="relative isolate flex min-h-[calc(100svh-70px)] items-center">
          <div className="shell relative z-10 grid w-full min-w-0 items-center gap-12 py-14 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:py-20">
            <div className="min-w-0 max-w-3xl">
              <div data-reveal className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/[0.035] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/78 backdrop-blur-md">
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

              <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  ref={heroPrimaryRef}
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
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
                </a>
                <a
                  href={`#${sectionIds.offers}`}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/14 bg-white/[0.035] px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:border-brand/40 hover:bg-white/[0.07]"
                >
                  {landingContent.hero.secondaryCta}
                  <ChevronDown className="size-5 text-brand" />
                </a>
              </div>

              <div data-reveal className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-y border-white/12 py-5">
                {[
                  ["72h", "para publicar"],
                  ["SEO", "base completa"],
                  ["A/B", "opcional"],
                ].map(([value, label]) => (
                  <div key={value} className="pr-4">
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

            <div data-reveal className="relative min-w-0">
              <LiquidGlassV2
                variant="sidebar"
                borderRadius="2rem"
                enableHover={false}
                enableTilt
                blur={24}
                className="!cursor-default"
              >
                <div className="w-full p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-6 border-b border-white/12 pb-6">
                    <p className="max-w-[12rem] font-mono text-[11px] uppercase leading-5 tracking-[0.16em] text-white/58">
                      Oferta rápida com estrutura premium e publicação assistida
                    </p>
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>

                  <div className="py-9">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                        A partir de
                      </p>
                      <p className="mt-3 text-[3.1rem] font-medium leading-none text-brand sm:text-[4rem]">
                        R$ 198,00
                      </p>
                      <h3 className="mt-6 max-w-sm text-2xl font-medium leading-tight tracking-normal text-white">
                        Landing pages, sites e apps com acabamento de marca grande.
                      </h3>
                    </div>
                  </div>

                  <p className="border-t border-white/12 pt-6 text-sm leading-7 text-white/68">
                    {landingContent.offers[0].description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {landingContent.offers[0].features.map((feature) => (
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
            className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/42"
          >
            <span>scroll</span>
            <span className="block h-8 w-px animate-pulse bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </section>

        <section
          aria-label="Selo de confiança"
          className="marquee-shell relative overflow-hidden border-y border-white/10 bg-white/[0.01] py-5 backdrop-blur-sm"
        >
          <div
            className="marquee-track flex w-max gap-16 whitespace-nowrap px-8"
            style={{
              animation: "be-marquee 34s linear infinite",
            }}
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

        <section
          id={sectionIds.shift}
          className="section-band"
        >
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
                      <p className="text-sm leading-7 text-white/72">
                        {point}
                      </p>
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
                        ) : index === 1 ? (
                          <Layers3 className="size-4" />
                        ) : (
                          <Sparkles className="size-4" />
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

        <section
          id={sectionIds.offers}
          className="section-band-muted"
        >
          <div className="shell">
            <div data-reveal className="section-heading-row min-w-0">
              <div className="max-w-3xl">
                <span className="section-kicker">
                  <Zap className="size-3.5 text-brand" />
                  Comprar
                </span>
                <h2 className="section-title mt-6">
                  Escolha a oferta certa e coloque sua marca no ar.
                </h2>
              </div>
              <p className="max-w-md font-mono text-xs leading-6 text-white/56">
                As versões com teste A/B são para quem quer otimizar com mais
                precisão e escalar com dados.
              </p>
            </div>

            <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
              {landingContent.offers.map((offer) => (
                <div key={offer.title} data-reveal className="relative h-full pt-4">
                  {offer.highlight ? (
                    <>
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 top-4 rounded-[2.05rem] opacity-80"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(57,254,21,0.55), rgba(57,254,21,0.05) 50%, rgba(57,254,21,0.4))",
                          animation: "be-glow-pulse 3.6s ease-in-out infinite",
                          filter: "blur(0.5px)",
                        }}
                      />
                      <div className="absolute right-5 top-0 z-20 flex items-center gap-2 rounded-full border border-brand/50 bg-[#040904]/90 px-3.5 py-1.5 shadow-[0_0_18px_rgba(57,254,21,0.28)] backdrop-blur-sm">
                        <span
                          className="size-1.5 rounded-full bg-brand"
                          style={{ animation: "be-pulse-soft 2s ease-in-out infinite" }}
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                          {offer.highlight}
                        </span>
                      </div>
                    </>
                  ) : null}
                  <LiquidGlassV2
                    variant="sidebar"
                    borderRadius="2rem"
                    enableHover={false}
                    className="h-full !cursor-default"
                  >
                    <div className="flex min-h-[520px] w-full flex-col p-6 sm:p-8 lg:min-h-[560px]">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <h3 className="text-xl font-medium leading-tight tracking-normal text-white sm:text-[1.35rem]">
                            {offer.title}
                          </h3>
                          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/48">
                            {offer.subtitle}
                          </p>
                        </div>
                        <p className="shrink-0 text-2xl font-medium leading-none text-brand sm:text-[1.45rem]">
                          {offer.price}
                        </p>
                      </div>

                      <p className="mt-6 min-h-[56px] text-sm leading-7 text-white/68">
                        {offer.description}
                      </p>

                      <ul className="mt-6 grid gap-2.5">
                        {offer.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex min-h-12 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-3 text-xs text-white/78 sm:text-sm"
                          >
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-brand-soft">
                              <Check className="size-3 text-brand" />
                            </span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="group mt-auto inline-flex min-h-12 items-center justify-between gap-3 rounded-full border border-white/14 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:border-brand/40 hover:bg-white/[0.08]"
                      >
                        <span>{landingContent.contact.whatsappLabel}</span>
                        <ArrowUpRight className="size-4 text-brand transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </LiquidGlassV2>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id={sectionIds.support}
          className="section-band"
        >
          <div className="shell">
            <div data-reveal className="max-w-3xl">
              <span className="section-kicker">
                <Clock3 className="size-3.5 text-brand" />
                Suporte mensal
              </span>
              <h2 className="section-title mt-6">
                Continue evoluindo sem perder padrão.
              </h2>
              <p className="section-copy mt-5">
                Planos recorrentes para manter sua página afiada, sem retrabalho.
              </p>
            </div>

            <div data-reveal className="mt-12">
              <LiquidGlassV2
                variant="sidebar"
                borderRadius="2rem"
                enableHover={false}
                className="!cursor-default"
              >
                <div className="w-full p-5 sm:p-7">
                  {[...landingContent.supportPlans, landingContent.addonEmail].map(
                    (plan, index) => (
                      <div
                        key={plan.title}
                        className="grid gap-5 border-b border-white/10 py-6 first:pt-0 last:border-b-0 last:pb-0 lg:grid-cols-[0.8fr_0.52fr_1fr] lg:items-center"
                      >
                        <div>
                          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/42">
                            {index < 2 ? "Plano recorrente" : "Complemento"}
                          </p>
                          <h3 className="mt-3 text-xl font-medium leading-tight tracking-normal text-white">
                            {plan.title}
                          </h3>
                        </div>
                        <div className="lg:text-center">
                          <p className="text-2xl font-medium leading-none text-brand">
                            {plan.price}
                          </p>
                          <p className="mt-2 font-mono text-[10px] uppercase leading-5 tracking-[0.12em] text-white/46">
                            {plan.afterPrice}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm leading-7 text-white/68">
                            {plan.description}
                          </p>
                          {Array.isArray(
                            (plan as { features?: string[] }).features,
                          ) ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {(
                                plan as unknown as { features: string[] }
                              ).features.map((feature) => (
                                  <span
                                    key={feature}
                                    className="inline-flex items-center gap-2 rounded-full bg-white/[0.035] px-3 py-1.5 text-[11px] text-white/72"
                                  >
                                    <Check className="size-3 text-brand" />
                                    {feature}
                                  </span>
                                ))}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </LiquidGlassV2>
            </div>
          </div>
        </section>

        <section
          id={sectionIds.process}
          className="section-band-muted"
        >
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
                Tiramos o projeto do papel com clareza, ritmo e padrão premium do
                briefing à publicação.
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
              className="timeline-scroll mt-12 overflow-x-auto pb-5 lg:overflow-visible"
              aria-label="Timeline horizontal da BlackElephant"
            >
              <div
                data-horizontal-track
                className="relative flex min-w-max snap-x snap-mandatory gap-5 pr-8 will-change-transform lg:snap-none"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-[4.25rem] h-px bg-gradient-to-r from-white/10 via-brand/55 to-white/10"
                />
                {landingContent.companyTimeline.map((item, index) => (
                  <article
                    key={item.year}
                    className="relative w-[78vw] max-w-[420px] snap-start sm:w-[360px] lg:w-[420px]"
                  >
                    <div className="relative z-10 mb-6 flex items-center gap-4">
                      <span className="flex size-10 items-center justify-center rounded-full bg-brand font-mono text-sm text-brand-foreground">
                        {index + 1}
                      </span>
                      <span className="h-px flex-1 bg-white/14" />
                    </div>
                    <LiquidGlassV2
                      variant="sidebar"
                      borderRadius="1.8rem"
                      enableHover={false}
                      className="h-full !cursor-default"
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
                    </LiquidGlassV2>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

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

        <section className="section-band-muted">
          <div className="shell">
            <div data-reveal className="section-heading-row min-w-0">
              <div className="max-w-3xl">
                <span className="section-kicker">
                  <Layers3 className="size-3.5 text-brand" />
                  Portfólio
                </span>
                <h2 className="section-title mt-6">
                  Trabalhos que falam por si.
                </h2>
              </div>
              <p className="max-w-md font-mono text-xs leading-6 text-white/56">
                Sistemas e presença digital entregues com padrão premium para empresas reais.
              </p>
            </div>

            <div
              data-reveal
              className="mt-10 flex gap-2 overflow-x-auto pb-2"
              style={{ scrollbarWidth: "none" }}
            >
              {portfolioProjects.map((project, index) => (
                <button
                  key={project.slug}
                  onClick={() => setActiveProject(index)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                    activeProject === index
                      ? "border-brand/50 bg-brand-soft text-brand"
                      : "border-white/12 bg-white/[0.025] text-white/56 hover:border-white/24 hover:text-white/80"
                  }`}
                >
                  {project.name}
                </button>
              ))}
            </div>

            <div data-reveal className="mt-5">
              <BendSliderComponent
                images={portfolioProjects[activeProject].images}
                className="h-[62vh] min-h-[340px] w-full overflow-hidden rounded-[2rem]"
              />
            </div>

            <div data-reveal className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
              <div className="flex shrink-0 items-center gap-4">
                <div className="flex h-12 min-w-[80px] items-center justify-center rounded-2xl border border-white/12 bg-white/[0.025] px-4">
                  <img
                    src={portfolioProjects[activeProject].logo}
                    alt={portfolioProjects[activeProject].name}
                    className="max-h-7 w-auto object-contain"
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

              <p className="min-w-0 flex-1 text-sm leading-7 text-white/68">
                {portfolioProjects[activeProject].description}
              </p>

              <div className="flex shrink-0 flex-wrap items-center gap-4 lg:flex-col lg:items-end">
                <div className="flex flex-wrap gap-1.5">
                  {portfolioProjects[activeProject].tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.035] px-3 py-1.5 font-mono text-[11px] text-white/72"
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
        </section>

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
                Ainda restou dúvida? Manda no WhatsApp — a gente responde sem
                roteiro.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-3 rounded-full border border-brand/30 bg-brand-soft px-5 py-3 text-sm font-medium text-brand transition hover:bg-brand-soft/70"
              >
                <MessageCircleMore className="size-4" />
                Falar com a gente
              </a>
            </div>
            <FaqAccordion items={landingContent.faq} />
          </div>
        </section>

        <section className="relative py-24 sm:py-32">
          <div className="shell relative z-10">
            <div data-reveal>
              <LiquidGlassV2
                variant="sidebar"
                borderRadius="2.4rem"
                enableHover={false}
                blur={28}
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
                    <a
                      ref={finalCtaRef}
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full bg-brand px-7 py-3 text-sm font-medium text-brand-foreground transition hover:translate-y-[-1px] hover:bg-[#58ff39]"
                    >
                      <span className="relative z-10">
                        {landingContent.contact.whatsappLabel}
                      </span>
                      <MessageCircleMore className="relative z-10 size-5" />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
                      />
                    </a>
                    <div className="inline-flex min-h-12 items-center rounded-full border border-white/14 bg-white/[0.04] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white/62">
                      {landingContent.contact.whatsappNumber}
                    </div>
                  </div>
                </div>
              </LiquidGlassV2>
            </div>
          </div>
        </section>

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
