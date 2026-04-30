export interface LandingService {
  iconKey: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  badge?: string;
}

export interface PartnershipPillar {
  iconKey: string;
  title: string;
  description: string;
  tags: string[];
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
  services: LandingService[];
  partnershipPillars: PartnershipPillar[];
  process: {
    title: string;
    description: string;
  }[];
  companyTimeline: TimelineEntry[];
  proofPlaceholders: ProofPlaceholder[];
  faq: FaqItem[];
}

export const landingContent: LandingPageContent = {
  hero: {
    headline: "Seu site institucional em 72h",
    subheadline:
      "Criamos sites e landing pages com visual premium, segurança e publicação em até 72 horas.",
    primaryCta: "Solicitar um orçamento personalizado",
    secondaryCta: "Conhecer nossos serviços",
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
  ],
  services: [
    {
      iconKey: "Globe",
      title: "Site Institucional",
      subtitle: "Autoridade digital para sua marca",
      description:
        "Para empresas que precisam transmitir credibilidade e fechar negócios pelo digital. Entregamos em até 72 horas.",
      features: [
        "Design premium responsivo",
        "SEO completo",
        "Hospedagem e domínio grátis",
        "Publicação em até 72 horas",
        "Copy e estrutura comercial",
      ],
    },
    {
      iconKey: "Layers3",
      title: "Landing Page",
      subtitle: "Conversão focada em resultado",
      description:
        "Página única de alta performance para campanhas, ofertas e captação de leads qualificados. Pronta em até 72 horas.",
      features: [
        "Narrativa comercial estratégica",
        "Otimizada para tráfego pago",
        "CTA e formulário de captação",
        "SEO e carregamento rápido",
        "Teste A/B opcional",
      ],
      badge: "Mais pedido",
    },
  ],
  partnershipPillars: [
    {
      iconKey: "RefreshCw",
      title: "Atualizações recorrentes",
      description:
        "Mantemos sua presença sempre alinhada com a evolução do seu negócio.",
      tags: ["Até 4 atualizações/mês", "Ajustes visuais e textuais", "Padrão premium contínuo"],
    },
    {
      iconKey: "ShieldCheck",
      title: "Segurança e infraestrutura",
      description:
        "SSL ativo, backups regulares e monitoramento de disponibilidade para proteger sua operação.",
      tags: ["SSL e HTTPS", "Backups automáticos", "Uptime monitorado"],
    },
    {
      iconKey: "LineChart",
      title: "Evolução orientada a dados",
      description:
        "Métricas reais para propor melhorias que fazem sentido para o seu objetivo.",
      tags: ["Teste A/B estratégico", "Análise de performance", "Otimização contínua"],
    },
    {
      iconKey: "MessageCircleMore",
      title: "Suporte técnico direto",
      description:
        "Canal direto com o time para resolver urgências e ajustes técnicos sem burocracia.",
      tags: ["Resposta rápida", "Canal direto com o time", "Sem fila de chamado"],
    },
  ],
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
        "Vale para sites institucionais e landing pages dentro do escopo padrão. Projetos com escopo ampliado têm prazo ajustado e definido no orçamento personalizado.",
    },
    {
      question: "Hospedagem e domínio realmente já estão inclusos?",
      answer: "Sim. Todos os projetos de site e landing page incluem hospedagem e domínio grátis.",
    },
    {
      question: "O site fica preparado para celular e Google?",
      answer: "Sim. O projeto sai responsivo, seguro e com SEO de base.",
    },
    {
      question: "Quando vale a pena escolher a versão com teste A/B?",
      answer:
        "Quando você quer validar headline, CTA ou abordagem com mais precisão e tem tráfego suficiente para gerar dados confiáveis.",
    },
    {
      question: "Como funciona o suporte contínuo?",
      answer:
        "Após a entrega, oferecemos planos de parceria para manter, otimizar e evoluir o que foi construído. Os detalhes são apresentados no orçamento conforme o projeto.",
    },
    {
      question: "Vocês também cuidam do ambiente de e-mail da empresa?",
      answer:
        "Sim. Estruturamos Google Workspace ou Microsoft 365 com segurança e ambiente digital profissional.",
    },
  ],
};
