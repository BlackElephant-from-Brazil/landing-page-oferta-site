# Copy Revision — BlackElephant Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all landing page copy using Método Centenari: hit real pain points, insert proof data (+15% conversão, +10% margem, 200 projetos, 8 anos), mark A/B offers as "Recomendado", and add a final CTA section with P.S.

**Architecture:** Two files change. `lib/landing-content.ts` receives new fields (painPointsTitle, solutionBridge, credibilitySection, ctaFinal) and updated content. `components/landing-page.tsx` gets updated hardcoded headlines and consumes the new fields.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS 4

---

## File Map

| File | Action | What changes |
|---|---|---|
| `lib/landing-content.ts` | Modify | New interface fields + all updated copy |
| `components/landing-page.tsx` | Modify | Hero h1, section titles/paragraphs, new painPointsTitle, solutionBridge, credibilitySection, ctaFinal |

---

## Task 1: Extend LandingPageContent interface and update all copy in landing-content.ts

**Files:**
- Modify: `lib/landing-content.ts`

- [ ] **Step 1: Replace the entire file content**

Replace `lib/landing-content.ts` with the following:

```typescript
export interface LandingOffer {
  title: string;
  price: string;
  subtitle: string;
  description: string;
  features: string[];
  highlight?: string;
}

export interface SupportPlan {
  title: string;
  price: string;
  afterPrice: string;
  description: string;
  features: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TimelineEntry {
  year: string;
  label: string;
  description: string;
}

export interface ProofCard {
  tag: string;
  body: string;
}

export interface LandingPageContent {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    trustBadges: string[];
  };
  painPointsTitle: string;
  painPoints: string[];
  solutionBridge: {
    title: string;
    description: string;
  };
  solutions: {
    title: string;
    description: string;
  }[];
  credibilitySection: {
    title: string;
    subtitle: string;
  };
  proofCards: ProofCard[];
  offers: LandingOffer[];
  supportPlans: SupportPlan[];
  addonEmail: {
    title: string;
    price: string;
    afterPrice: string;
    description: string;
  };
  process: {
    title: string;
    description: string;
  }[];
  companyTimeline: TimelineEntry[];
  faq: FaqItem[];
  ctaFinal: {
    title: string;
    description: string;
    cta: string;
    ps: string;
  };
  contact: {
    whatsappNumber: string;
    whatsappLabel: string;
    whatsappMessage: string;
  };
}

export const landingContent: LandingPageContent = {
  hero: {
    headline: "Chega de pagar caro por páginas que não convertem. A gente entrega em até 72h.",
    subheadline:
      "Sites e landing pages com visual de alto padrão, hospedagem e domínio grátis, entregues em até 72 horas. 8 anos de mercado. Mais de 200 projetos entregues.",
    primaryCta: "Solicitar orçamento no WhatsApp",
    secondaryCta: "Ver planos e ofertas",
    trustBadges: [
      "Entrega em até 72h",
      "Hospedagem e domínio grátis",
      "100% responsivo",
      "SEO completo",
    ],
  },
  painPointsTitle: "Reconhece alguma dessas situações?",
  painPoints: [
    "Você paga o gestor todo mês e as páginas continuam feias, lentas e sem converter.",
    "Precisa lançar um produto novo, mas não tem uma landing page pronta para isso.",
    "Seu site atual parece de 2015. Os clientes chegam, olham e vão embora.",
    "Você pediu, ele prometeu, atrasou. Quando entregou, não era o que você queria.",
  ],
  solutionBridge: {
    title: "Existe uma saída mais simples do que você imagina.",
    description: "Você não precisa de mais um gestor caro que vai sumir no meio do projeto. Precisa de um studio que já fez isso mais de 200 vezes, que sabe o que converte, e que coloca tudo no ar em até 72 horas com hospedagem e domínio inclusos. Sem surpresa no prazo. Sem surpresa no preço.",
  },
  solutions: [
    {
      title: "Site institucional que passa credibilidade de verdade",
      description:
        "Sua empresa finalmente vai parecer tão boa quanto é. Visual premium, SEO completo e responsivo em qualquer tela.",
    },
    {
      title: "Landing page pronta para converter",
      description:
        "Página focada em uma coisa só: transformar visitante em contato ou venda. Ideal para lançamentos e tráfego pago.",
    },
    {
      title: "Além do site: soluções que fazem sua operação crescer",
      description:
        "Para quando você precisa de mais do que uma página: apps, automações e sistemas feitos para o seu negócio.",
    },
  ],
  credibilitySection: {
    title: "Resultados reais de quem já passou por aqui.",
    subtitle: "8 anos de mercado. Mais de 200 projetos entregues. Estes são alguns dos resultados.",
  },
  proofCards: [
    {
      tag: "Landing page",
      body: "Um dos nossos clientes aumentou em 15% a taxa de conversão após trocar a landing page antiga pela nossa.",
    },
    {
      tag: "Site institucional",
      body: "Com páginas mais atrativas, outro cliente conseguiu vender serviços de ticket maior, aumentando a margem em 10%.",
    },
    {
      tag: "BlackElephant",
      body: "+200 projetos entregues em 8 anos. Sites, apps, landing pages e sistemas para empresas que precisavam de mais do que um gestor.",
    },
  ],
  offers: [
    {
      title: "Comprar o site",
      price: "R$ 1.198,00",
      subtitle: "Para quem precisa aparecer bem e passar confiança desde o primeiro clique.",
      description:
        "Seu site no ar em até 72h com visual premium, hospedagem e domínio grátis. Feito para durar e para converter.",
      features: [
        "Design premium responsivo",
        "SEO completo",
        "Hospedagem e domínio grátis",
        "Publicação em até 72 horas",
      ],
    },
    {
      title: "Comprar o site com teste A/B",
      price: "R$ 1.998,00",
      subtitle: "Para quem quer resultado, não achismo.",
      description:
        "Tudo do site institucional, mais variações estratégicas para descobrir o que realmente converte no seu negócio.",
      features: [
        "Tudo do site institucional",
        "Setup de experimento A/B",
        "Base para decisões com dados",
        "Melhoria contínua de conversão",
      ],
      highlight: "Recomendado",
    },
    {
      title: "Comprar a landing page",
      price: "R$ 798,00",
      subtitle: "Para lançamentos, campanhas e captação de leads.",
      description:
        "Uma página com foco total em conversão. CTA claro, narrativa comercial e visual pronto para tráfego pago.",
      features: [
        "Página única de alta conversão",
        "CTA e narrativa comercial",
        "Visual pronto para tráfego pago",
        "Entrega rápida",
      ],
    },
    {
      title: "Comprar a landing page com teste A/B",
      price: "R$ 1.298,00",
      subtitle: "Para quem roda tráfego e quer dados, não suposições.",
      description:
        "Tudo da landing page, mais variações para testar headline, CTA e abordagem. A base para escalar com segurança.",
      features: [
        "Tudo da landing page",
        "Variações estratégicas para teste",
        "Mais clareza sobre performance",
        "Base para escalar campanhas",
      ],
      highlight: "Recomendado",
    },
  ],
  supportPlans: [
    {
      title: "Suporte mensal site / landing page",
      price: "R$ 198,00/mês",
      afterPrice: "Depois: R$ 70,00 por atualização",
      description: "Mantém sua página atualizada sem perder ritmo.",
      features: [
        "Até 4 atualizações por mês",
        "Ajustes visuais e textuais",
        "Continuidade com padrão premium",
      ],
    },
    {
      title: "Suporte mensal com teste A/B",
      price: "R$ 298,00/mês",
      afterPrice: "Depois: R$ 100,00 por atualização",
      description: "Atualiza e otimiza a página com mais método.",
      features: [
        "Até 4 atualizações por mês",
        "Manutenção contínua",
        "Estratégia com teste A/B",
      ],
    },
  ],
  addonEmail: {
    title: "Google Workspace ou Microsoft 365 + ambiente digital seguro",
    price: "R$ 99,00/mês",
    afterPrice: "Após 5 e-mails: R$ 14,99/mês por novo e-mail",
    description: "E-mail profissional com estrutura segura para a empresa.",
  },
  process: [
    {
      title: "1. Briefing rápido e objetivo",
      description:
        "Em uma conversa curta no WhatsApp entendemos sua oferta, sua marca e o que a página precisa comunicar. Sem formulário longo, sem reunião de 2 horas.",
    },
    {
      title: "2. Design, copy e implementação",
      description:
        "Montamos a página com visual forte, textos que vendem e código limpo. Você acompanha e aprova antes de ir ao ar.",
    },
    {
      title: "3. Publicação e ativação",
      description:
        "Subimos tudo: domínio, hospedagem, SSL e SEO de base. Em até 72h a partir do briefing, sua página está no ar e pronta para receber visitas.",
    },
  ],
  companyTimeline: [
    {
      year: "2017",
      label: "Nascimento",
      description: "Começamos com software de gestão para restaurantes.",
    },
    {
      year: "2019",
      label: "Masterização",
      description: "Reinventamos o produto para o PDV beSystem.",
    },
    {
      year: "2022",
      label: "Mudança",
      description: "Passamos a atuar com projetos mais personalizados.",
    },
    {
      year: "2026",
      label: "Expansão",
      description: "Expandimos para sites, apps, automações e presença digital.",
    },
  ],
  faq: [
    {
      question: "A entrega em 72 horas é garantida?",
      answer:
        "Para os projetos dentro do escopo desta oferta, sim. Assim que o briefing é aprovado, o cronômetro começa. Você recebe a página pronta para revisar em até 72 horas. Se precisar de ajuste, fazemos sem burocracia.",
    },
    {
      question: "Hospedagem e domínio realmente estão inclusos? Por quanto tempo?",
      answer:
        "Sim, inclusos no projeto. Sem custo adicional no primeiro ano. Depois, os planos de suporte mensal cobrem a continuidade.",
    },
    {
      question: "Vale a pena pagar a mais pelo teste A/B?",
      answer:
        "Se você vai rodar tráfego pago ou tem mais de uma hipótese de comunicação, sim. O A/B elimina o achismo e mostra com dados o que realmente converte. Um de nossos clientes aumentou 15% na conversão com esse recurso.",
    },
    {
      question: "O que acontece se eu não gostar do resultado?",
      answer:
        "A gente ajusta até ficar certo. Você aprova o design antes de ir ao ar. Não subimos nada sem sua confirmação.",
    },
    {
      question: "Vocês só fazem sites ou também criam a estratégia?",
      answer:
        "Criamos a estrutura visual e a narrativa comercial da página. Se você precisar de tráfego pago ou gestão de campanhas, indicamos parceiros de confiança.",
    },
    {
      question: "Como funciona o suporte mensal?",
      answer:
        "Cada plano cobre até 4 atualizações mensais: ajustes de texto, visual, botões, imagens. Você aciona pelo WhatsApp e a gente resolve. Sem ticket, sem espera de semanas.",
    },
  ],
  ctaFinal: {
    title: "Sua página pode estar no ar essa semana.",
    description: "Cada dia com uma página ruim é um dia perdendo cliente para o concorrente. Chama a gente no WhatsApp agora e em até 72 horas seu site ou landing page está pronto.",
    cta: "Quero minha página agora",
    ps: "P.S.: Hospedagem e domínio grátis no primeiro ano. Sem surpresa no prazo. Sem surpresa no preço.",
  },
  contact: {
    whatsappNumber: "+55 19 97805-5531",
    whatsappLabel: "Falar agora no WhatsApp",
    whatsappMessage:
      "Olá, quero um orçamento para site, landing page ou app da BlackElephant.",
  },
};
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd "C:\Users\guilh\OneDrive\Documents\BlackElephant\Projetos\landing-page-oferta-site" && npx tsc --noEmit 2>&1 | head -30`

Expected: errors only from `landing-page.tsx` (it still references removed fields like `hero.abVariants`, `hero.quickPoints`, `proofPlaceholders`). Those get fixed in Task 2. Zero errors from `landing-content.ts` itself.

- [ ] **Step 3: Commit**

```bash
git add lib/landing-content.ts
git commit -m "content: rewrite all copy using Método Centenari — pain points, proof data, A/B badges"
```

---

## Task 2: Update landing-page.tsx — hero h1, section titles, new fields

**Files:**
- Modify: `components/landing-page.tsx`

### 2a — Remove unused imports from landing-content references

- [ ] **Step 1: Remove `hero.abVariants` and `hero.quickPoints` usages**

Search for any usage of `abVariants` and `quickPoints` in `landing-page.tsx`. If found, remove those JSX blocks entirely (they are legacy A/B variant text that was not rendered in the main UI path — confirm by grepping).

Run: `grep -n "abVariants\|quickPoints" components/landing-page.tsx`

If lines are found, delete the JSX blocks that reference them.

### 2b — Update hero h1 (line ~317)

- [ ] **Step 2: Replace the hardcoded hero h1**

Find this block (around line 313–321):
```tsx
<h1
  data-reveal
  className="mt-7 max-w-4xl text-[2.45rem] font-medium leading-[0.94] tracking-normal text-white sm:text-[4rem] lg:text-[5.45rem]"
>
  <span className="hero-outline">Sites</span>{" "}
  <span className="hero-highlight">premium</span> em 72h para
  marcas que precisam vender mais.
</h1>
```

Replace with:
```tsx
<h1
  data-reveal
  className="mt-7 max-w-4xl text-[2.45rem] font-medium leading-[0.94] tracking-normal text-white sm:text-[4rem] lg:text-[5.45rem]"
>
  Chega de pagar caro por páginas que{" "}
  <span className="hero-outline">não convertem.</span>{" "}
  A gente entrega em{" "}
  <span className="hero-highlight">até 72h.</span>
</h1>
```

### 2c — Update the hero stats bar (line ~355)

- [ ] **Step 3: Update the 3-column stats under the CTA buttons**

Find this block (around line 355–370):
```tsx
<div data-reveal className="mt-12 grid max-w-2xl grid-cols-3 gap-3 border-y border-white/12 py-5">
  {[
    ["72h", "para publicar"],
    ["SEO", "base completa"],
    ["A/B", "opcional"],
  ].map(([value, label]) => (
```

Replace the data array with:
```tsx
{[
  ["72h", "para publicar"],
  ["+200", "projetos entregues"],
  ["8+", "anos de mercado"],
].map(([value, label]) => (
```

### 2d — Update the Diferencial section title and paragraph (line ~494)

- [ ] **Step 4: Replace the Diferencial section hardcoded title and paragraph**

Find (around line 494–500):
```tsx
<h2 className="section-title mt-6">
  Seu digital precisa transmitir o tamanho real da sua empresa.
</h2>
<p className="section-copy mt-5">
  O problema não é só design. É percepção, confiança e clareza
  comercial. A gente entrega os três num pacote só.
</p>
```

Replace with:
```tsx
<h2 className="section-title mt-6">
  {landingContent.painPointsTitle}
</h2>
```

(Remove the `<p>` entirely — the pain points bullets tell the story now.)

### 2e — Add solution bridge before solutions cards (line ~520)

- [ ] **Step 5: Add solutionBridge between pain points and solution cards**

Find the opening of the solutions column (around line 520):
```tsx
<div className="min-w-0 space-y-4">
  {landingContent.solutions.map((solution, index) => (
```

Replace with:
```tsx
<div className="min-w-0 space-y-4">
  <div data-reveal className="pb-4">
    <h3 className="text-2xl font-medium leading-tight tracking-normal text-white">
      {landingContent.solutionBridge.title}
    </h3>
    <p className="mt-4 text-sm leading-7 text-white/70">
      {landingContent.solutionBridge.description}
    </p>
  </div>
  {landingContent.solutions.map((solution, index) => (
```

### 2f — Update credibility section (line ~853)

- [ ] **Step 6: Replace hardcoded credibility title and subtitle, and swap proofPlaceholders for proofCards**

Find (around line 853–889):
```tsx
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
```

Replace with:
```tsx
<section className="section-band-muted">
  <div className="shell">
    <div data-reveal className="max-w-3xl">
      <span className="section-kicker">
        <BadgeCheck className="size-3.5 text-brand" />
        Resultados
      </span>
      <h2 className="section-title mt-6">
        {landingContent.credibilitySection.title}
      </h2>
      <p className="section-copy mt-5">
        {landingContent.credibilitySection.subtitle}
      </p>
    </div>

    <div className="mt-12 grid gap-5 lg:grid-cols-3">
      {landingContent.proofCards.map((item) => (
        <div key={item.tag} data-reveal>
          <LiquidGlassV2
            variant="sidebar"
            borderRadius="1.8rem"
            enableHover={false}
            className="h-full !cursor-default"
          >
            <div className="flex h-full w-full flex-col p-6 sm:p-7">
              <div className="inline-flex w-fit rounded-full border border-brand/25 bg-brand-soft px-3 py-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
                  {item.tag}
                </span>
              </div>
              <p className="mt-6 text-sm leading-7 text-white/80">
                {item.body}
              </p>
            </div>
          </LiquidGlassV2>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 2g — Update final CTA section (line ~1169)

- [ ] **Step 7: Replace hardcoded final CTA section text and add P.S.**

Find (around line 1183–1210):
```tsx
<h2 className="mx-auto mt-8 max-w-4xl text-3xl font-medium leading-[1.02] tracking-normal text-white sm:text-4xl lg:text-[3.2rem]">
  Sua empresa pode entrar no digital com mais autoridade.
</h2>
<p className="mx-auto mt-6 max-w-2xl font-mono text-sm leading-7 text-white/72 sm:text-base">
  A BlackElephant entrega estrutura, acabamento e velocidade
  para sua marca vender melhor — em até 72 horas.
</p>
```

Replace with:
```tsx
<h2 className="mx-auto mt-8 max-w-4xl text-3xl font-medium leading-[1.02] tracking-normal text-white sm:text-4xl lg:text-[3.2rem]">
  {landingContent.ctaFinal.title}
</h2>
<p className="mx-auto mt-6 max-w-2xl font-mono text-sm leading-7 text-white/72 sm:text-base">
  {landingContent.ctaFinal.description}
</p>
```

Also find the final CTA primary button label (around line 1200):
```tsx
<span className="relative z-10">
  {landingContent.contact.whatsappLabel}
</span>
```

Replace with:
```tsx
<span className="relative z-10">
  {landingContent.ctaFinal.cta}
</span>
```

Then, after the two `<a>` / `<div>` buttons block (after the `</div>` that closes `mt-10 flex flex-col...`), add the P.S.:
```tsx
<p className="mx-auto mt-8 max-w-xl font-mono text-xs leading-6 text-white/46">
  {landingContent.ctaFinal.ps}
</p>
```

- [ ] **Step 8: Verify TypeScript compiles with zero errors**

Run: `cd "C:\Users\guilh\OneDrive\Documents\BlackElephant\Projetos\landing-page-oferta-site" && npx tsc --noEmit 2>&1`

Expected: No errors. If errors appear about removed fields (`abVariants`, `quickPoints`, `proofPlaceholders`), locate and remove those references in `landing-page.tsx`.

- [ ] **Step 9: Commit**

```bash
git add components/landing-page.tsx
git commit -m "feat: update landing page JSX to use new copy fields and Método Centenari structure"
```

---

## Task 3: Verify the site visually

**Files:**
- Read: `components/landing-page.tsx` (final state)

- [ ] **Step 1: Start dev server and confirm the page builds**

Run: `npm run dev`

Expected: Server starts on http://localhost:3000 with no build errors.

- [ ] **Step 2: Check each section for content accuracy**

Open http://localhost:3000 and verify:
- [ ] Hero h1 reads "Chega de pagar caro por páginas que não convertem. A gente entrega em até 72h."
- [ ] Stats bar shows "72h / +200 / 8+"
- [ ] Diferencial title is "Reconhece alguma dessas situações?"
- [ ] Solution bridge paragraph appears before the 3 solution cards
- [ ] Credibility cards show real proof data (15%, 10%, +200)
- [ ] Offers for A/B variants show "Recomendado" badge
- [ ] Process descriptions are expanded
- [ ] FAQ has 6 new Q&A pairs
- [ ] Final CTA reads "Sua página pode estar no ar essa semana."
- [ ] P.S. appears below the CTA buttons

- [ ] **Step 3: Final commit**

```bash
git add .
git commit -m "chore: landing page copy revision complete — Método Centenari"
```
