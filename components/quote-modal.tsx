"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check, Loader2 } from "lucide-react";

const PROJECT_TYPES = [
  "App",
  "Sistema",
  "Landing Page",
  "Site",
  "Robô de WhatsApp",
  "E-commerce",
  "Blog",
  "Outro",
] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];

type FormState = {
  name: string;
  site: string;
  email: string;
  whatsapp: string;
  projectTypes: ProjectType[];
  summary: string;
};

type SubmitState = "idle" | "loading" | "success" | "error";

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
}

function applyPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const SUMMARY_MIN = 50;

export default function QuoteModal({ open, onClose }: QuoteModalProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    site: "",
    email: "",
    whatsapp: "",
    projectTypes: [],
    summary: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => firstFocusRef.current?.focus(), 120);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = overlayRef.current?.querySelector<HTMLElement>(
        '[role="dialog"]',
      );
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length < 2) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setForm({
          name: "",
          site: "",
          email: "",
          whatsapp: "",
          projectTypes: [],
          summary: "",
        });
        setErrors({});
        setSubmitState("idle");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const toggleProjectType = (type: ProjectType) => {
    setForm((f) => ({
      ...f,
      projectTypes: f.projectTypes.includes(type)
        ? f.projectTypes.filter((t) => t !== type)
        : [...f.projectTypes, type],
    }));
    setErrors((e) => ({ ...e, projectTypes: undefined }));
  };

  const validateField = (
    name: keyof FormState,
    value: string | ProjectType[],
  ): string | undefined => {
    switch (name) {
      case "name":
        return !String(value).trim() ? "Informe seu nome" : undefined;
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim())
          ? "Informe um e-mail válido"
          : undefined;
      case "whatsapp":
        return String(value).replace(/\D/g, "").length < 10
          ? "Informe um WhatsApp válido com DDD"
          : undefined;
      case "projectTypes":
        return (value as ProjectType[]).length === 0
          ? "Selecione ao menos um tipo de projeto"
          : undefined;
      case "summary":
        return String(value).trim().length < SUMMARY_MIN
          ? `Descreva um pouco mais (mín. ${SUMMARY_MIN} caracteres)`
          : undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (name: keyof FormState) => {
    const error = validateField(name, form[name]);
    setErrors((e) => ({ ...e, [name]: error }));
  };

  const validate = (): boolean => {
    const required: (keyof FormState)[] = [
      "name",
      "email",
      "whatsapp",
      "projectTypes",
      "summary",
    ];
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    required.forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const firstError = document.querySelector<HTMLElement>(
        '[data-field-error="true"]',
      );
      firstError?.focus();
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitState("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  const isSubmitDisabled =
    submitState === "loading" ||
    !form.name.trim() ||
    !form.email.trim() ||
    form.whatsapp.replace(/\D/g, "").length < 10 ||
    form.projectTypes.length === 0 ||
    form.summary.trim().length < SUMMARY_MIN;

  const inputBase =
    "w-full min-h-[46px] rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 transition focus:outline-none focus:ring-2 focus:ring-brand/40";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={overlayRef}
          key="quote-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: "rgba(5,6,5,0.88)", backdropFilter: "blur(8px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            key="quote-modal-card"
            role="dialog"
            aria-modal="true"
            aria-label="Solicitar orçamento personalizado"
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 340 }}
            className="glass-panel glass-border relative w-full max-w-[640px] rounded-[2rem] overflow-hidden"
            style={{ maxHeight: "92svh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            {submitState === "success" ? (
              <div className="flex flex-col items-center gap-6 px-8 py-16 text-center">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 18, stiffness: 280 }}
                  className="flex size-16 items-center justify-center rounded-full border border-brand/35 bg-brand-soft"
                >
                  <Check className="size-7 text-brand" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-medium text-white">
                    Pedido recebido!
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/68">
                    Em breve nosso time entrará em contato para entender melhor
                    seu projeto e enviar uma proposta personalizada.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-1 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/14 bg-white/[0.04] px-6 py-2.5 text-sm font-medium text-white transition hover:border-brand/40 hover:bg-white/[0.08]"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <div className="w-full p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-medium tracking-normal text-white sm:text-[1.35rem]">
                      Solicitar orçamento personalizado
                    </h2>
                    <p className="mt-1.5 text-sm text-white/52">
                      Proposta em até 24h — sem compromisso.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Fechar modal"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-white/20 hover:text-white"
                  >
                    <X className="size-4" />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-7 space-y-5"
                  noValidate
                >
                  {/* Nome */}
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="mb-2 block text-sm font-medium text-white/80"
                    >
                      Nome{" "}
                      <span className="text-brand" aria-label="obrigatório">
                        *
                      </span>
                    </label>
                    <input
                      ref={firstFocusRef}
                      id="quote-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      onBlur={() => handleBlur("name")}
                      data-field-error={!!errors.name || undefined}
                      placeholder="Seu nome completo"
                      className={inputBase}
                      style={{
                        borderColor: errors.name
                          ? "rgba(239,68,68,0.5)"
                          : "rgba(255,255,255,0.1)",
                      }}
                    />
                    {errors.name ? (
                      <p role="alert" className="mt-1.5 text-[11px] text-red-400">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  {/* Site */}
                  <div>
                    <label
                      htmlFor="quote-site"
                      className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80"
                    >
                      Site da empresa
                      <span className="rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/38">
                        opcional
                      </span>
                    </label>
                    <input
                      id="quote-site"
                      type="url"
                      autoComplete="url"
                      value={form.site}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, site: e.target.value }))
                      }
                      placeholder="https://suaempresa.com.br"
                      className={inputBase}
                      style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    />
                  </div>

                  {/* E-mail + WhatsApp */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="quote-email"
                        className="mb-2 block text-sm font-medium text-white/80"
                      >
                        E-mail{" "}
                        <span className="text-brand" aria-label="obrigatório">
                          *
                        </span>
                      </label>
                      <input
                        id="quote-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                        onBlur={() => handleBlur("email")}
                        data-field-error={!!errors.email || undefined}
                        placeholder="voce@empresa.com.br"
                        className={inputBase}
                        style={{
                          borderColor: errors.email
                            ? "rgba(239,68,68,0.5)"
                            : "rgba(255,255,255,0.1)",
                        }}
                      />
                      {errors.email ? (
                        <p
                          role="alert"
                          className="mt-1.5 text-[11px] text-red-400"
                        >
                          {errors.email}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label
                        htmlFor="quote-whatsapp"
                        className="mb-2 block text-sm font-medium text-white/80"
                      >
                        WhatsApp{" "}
                        <span className="text-brand" aria-label="obrigatório">
                          *
                        </span>
                      </label>
                      <input
                        id="quote-whatsapp"
                        type="tel"
                        autoComplete="tel"
                        value={form.whatsapp}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            whatsapp: applyPhoneMask(e.target.value),
                          }))
                        }
                        onBlur={() => handleBlur("whatsapp")}
                        data-field-error={!!errors.whatsapp || undefined}
                        placeholder="(11) 99999-9999"
                        className={inputBase}
                        style={{
                          borderColor: errors.whatsapp
                            ? "rgba(239,68,68,0.5)"
                            : "rgba(255,255,255,0.1)",
                        }}
                      />
                      {errors.whatsapp ? (
                        <p
                          role="alert"
                          className="mt-1.5 text-[11px] text-red-400"
                        >
                          {errors.whatsapp}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {/* Tipo de projeto */}
                  <div>
                    <p className="mb-3 text-sm font-medium text-white/80">
                      Tipo de projeto{" "}
                      <span className="text-brand" aria-label="obrigatório">
                        *
                      </span>
                    </p>
                    <div
                      role="group"
                      aria-label="Selecione o tipo de projeto"
                      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
                    >
                      {PROJECT_TYPES.map((type) => {
                        const selected = form.projectTypes.includes(type);
                        return (
                          <motion.button
                            key={type}
                            type="button"
                            onClick={() => toggleProjectType(type)}
                            aria-pressed={selected}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.1 }}
                            className="relative min-h-[44px] rounded-xl border px-3 py-2.5 text-[12px] font-medium transition-colors"
                            style={{
                              backgroundColor: selected
                                ? "rgba(57,254,21,0.10)"
                                : "rgba(255,255,255,0.03)",
                              borderColor: selected
                                ? "rgba(57,254,21,0.42)"
                                : "rgba(255,255,255,0.1)",
                              color: selected
                                ? "#39fe15"
                                : "rgba(245,246,241,0.55)",
                            }}
                          >
                            {selected ? (
                              <span className="absolute right-1.5 top-1.5 flex size-3.5 items-center justify-center rounded-full bg-brand">
                                <Check className="size-2 text-brand-foreground" />
                              </span>
                            ) : null}
                            {type}
                          </motion.button>
                        );
                      })}
                    </div>
                    {errors.projectTypes ? (
                      <p
                        role="alert"
                        className="mt-1.5 text-[11px] text-red-400"
                      >
                        {errors.projectTypes}
                      </p>
                    ) : null}
                  </div>

                  {/* Resumo */}
                  <div>
                    <label
                      htmlFor="quote-summary"
                      className="mb-2 flex items-center justify-between text-sm font-medium text-white/80"
                    >
                      <span>
                        Resumo do projeto{" "}
                        <span className="text-brand" aria-label="obrigatório">
                          *
                        </span>
                      </span>
                      <span
                        className={`font-mono text-[11px] tabular-nums transition ${
                          form.summary.trim().length >= SUMMARY_MIN
                            ? "text-brand/70"
                            : "text-white/30"
                        }`}
                      >
                        {form.summary.trim().length} / {SUMMARY_MIN}+
                      </span>
                    </label>
                    <textarea
                      id="quote-summary"
                      rows={4}
                      value={form.summary}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, summary: e.target.value }));
                        if (
                          errors.summary &&
                          e.target.value.trim().length >= SUMMARY_MIN
                        ) {
                          setErrors((er) => ({ ...er, summary: undefined }));
                        }
                      }}
                      onBlur={() => handleBlur("summary")}
                      data-field-error={!!errors.summary || undefined}
                      placeholder="Descreva brevemente o que você precisa. Ex: quero um site institucional para minha clínica odontológica com formulário de agendamento..."
                      className="w-full resize-y rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 transition focus:outline-none focus:ring-2 focus:ring-brand/40"
                      style={{
                        borderColor: errors.summary
                          ? "rgba(239,68,68,0.5)"
                          : "rgba(255,255,255,0.1)",
                        minHeight: "108px",
                      }}
                    />
                    {errors.summary ? (
                      <p
                        role="alert"
                        className="mt-1.5 text-[11px] text-red-400"
                      >
                        {errors.summary}
                      </p>
                    ) : null}
                  </div>

                  {submitState === "error" ? (
                    <p
                      role="alert"
                      aria-live="polite"
                      className="text-sm text-red-400"
                    >
                      Ocorreu um erro ao enviar. Tente novamente em instantes.
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className="group relative w-full inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full bg-brand px-7 py-3 text-sm font-medium text-brand-foreground shadow-[0_16px_44px_rgba(57,254,21,0.18)] transition hover:translate-y-[-1px] hover:bg-[#58ff39] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0"
                  >
                    {submitState === "loading" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <span className="relative z-10">
                          Enviar solicitação
                        </span>
                        <ArrowRight className="relative z-10 size-5 transition-transform group-hover:translate-x-0.5" />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
