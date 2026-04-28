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

export interface ProofPlaceholder {
  title: string;
  description: string;
}

export interface LandingPageContent {
  hero: {
    headline: string;
    abVariants: string[];
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    trustBadges: string[];
    quickPoints: string[];
  };
  painPoints: string[];
  solutions: {
    title: string;
    description: string;
  }[];
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
  proofPlaceholders: ProofPlaceholder[];
  faq: FaqItem[];
  contact: {
    whatsappNumber: string;
    whatsappLabel: string;
    whatsappMessage: string;
  };
}

export const landingContent: LandingPageContent = {
  hero: {
    headline: "Seu site institucional em 72h",
    abVariants: [
      "Seu site premium pronto em até 72 horas.",
      "Uma presença digital elegante para vender melhor.",
    ],
    subheadline:
      "Criamos sites, landing pages e apps com visual premium, segurança e publicação rápida.",
    primaryCta: "Solicitar orçamento no WhatsApp",
    secondaryCta: "Ver planos e ofertas",
    trustBadges: [
      "Hospedagem e domínio grátis",
      "100% responsivo",
      "Seguro",
      "SEO completo",
    ],
    quickPoints: ["Entrega rápida", "Visual premium", "Teste A/B opcional"],
  },
  painPoints: [
    "Sua empresa entrega bem, mas ainda não parece premium no digital.",
    "Seu site atual não converte, não posiciona e passa pouca confiança.",
    "Tudo está espalhado: comunicação, estrutura e percepção de valor.",
    "Falta uma página bonita, clara e pronta para vender.",
  ],
  solutions: [
    {
      title: "Sites institucionais que elevam percepção",
      description:
        "Estrutura elegante para transmitir autoridade no primeiro scroll.",
    },
    {
      title: "Landing pages para captação e venda",
      description: "Páginas focadas em clique, contato e resultado.",
    },
    {
      title: "Apps e presença digital sob medida",
      description: "Soluções personalizadas para evoluir sua operação digital.",
    },
  ],
  offers: [
    {
      title: "Comprar o site",
      price: "R$ 1.198,00",
      subtitle: "Institucional sob medida",
      description:
        "Para quem precisa de uma presença digital forte e elegante.",
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
      subtitle: "Versão orientada à otimização",
      description: "Inclui variações estratégicas para otimizar a conversão.",
      features: [
        "Tudo do site institucional",
        "Setup de experimento A/B",
        "Base para decisões com dados",
        "Melhoria contínua de conversão",
      ],
      highlight: "Mais estratégico",
    },
    {
      title: "Comprar a landing page",
      price: "R$ 798,00",
      subtitle: "LP focada em geração de demanda",
      description: "Ideal para campanhas, ofertas e captação de leads.",
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
      subtitle: "LP + otimização de performance",
      description: "Para quem quer testar criativos e vender com mais precisão.",
      features: [
        "Tudo da landing page",
        "Variações estratégicas para teste",
        "Mais clareza sobre performance",
        "Base para escalar campanhas",
      ],
      highlight: "Ideal para tráfego",
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
        "Entendemos sua oferta e a imagem que a marca precisa passar.",
    },
    {
      title: "2. Design, copy e implementação",
      description: "Montamos a página com visual forte e comunicação clara.",
    },
    {
      title: "3. Publicação e ativação",
      description: "Colocamos tudo no ar com domínio, hospedagem e base pronta.",
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
  proofPlaceholders: [
    {
      title: "Case em destaque",
      description: "Espaço para um projeto com antes e depois.",
    },
    {
      title: "Depoimento de cliente",
      description: "Espaço para uma fala real com nome e cargo.",
    },
    {
      title: "Prova de autoridade",
      description: "Área para logos, métricas ou validações futuras.",
    },
  ],
  faq: [
    {
      question: "A entrega em até 72 horas vale para qualquer projeto?",
      answer:
        "Vale para o escopo desta oferta. Projetos maiores podem exigir ajuste.",
    },
    {
      question: "Hospedagem e domínio realmente já estão inclusos?",
      answer: "Sim. A proposta já inclui hospedagem e domínio grátis.",
    },
    {
      question: "O site fica preparado para celular e Google?",
      answer: "Sim. O projeto sai responsivo, seguro e com SEO de base.",
    },
    {
      question: "Quando vale a pena escolher a versão com teste A/B?",
      answer:
        "Quando você quer validar headline, CTA ou abordagem com mais precisão.",
    },
    {
      question: "Como funciona o suporte mensal?",
      answer: "Cada plano cobre até 4 atualizações mensais.",
    },
    {
      question: "Vocês também cuidam do ambiente de e-mail da empresa?",
      answer:
        "Sim. Estruturamos Google Workspace ou Microsoft 365 com segurança.",
    },
  ],
  contact: {
    whatsappNumber: "+55 19 97805-5531",
    whatsappLabel: "Falar agora no WhatsApp",
    whatsappMessage:
      "Olá, quero um orçamento para site, landing page ou app da BlackElephant.",
  },
};
