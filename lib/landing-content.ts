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

export interface ProofMetric {
  value: string;
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
  proofMetrics: ProofMetric[];
  faq: FaqItem[];
}

export const landingContent: LandingPageContent = {
  hero: {
    headline: "Seu site premium no ar em 72 horas",
    subheadline:
      "Enquanto você lê isso, potenciais clientes estão julgando sua empresa pelo que veem no digital. A gente resolve isso em até 72 horas. Design premium, SEO e hospedagem inclusa.",
    primaryCta: "Quero meu site em 72 horas",
    secondaryCta: "Ver o que entregamos",
    trustBadges: [
      "Hospedagem e domínio grátis",
      "100% responsivo",
      "Seguro e com SSL",
      "SEO base completo",
    ],
    quickPoints: ["Entrega em 72h", "Visual premium", "Suporte de verdade"],
  },
  painPoints: [
    "Sua empresa entrega bem, mas seu site passa a impressão errada para quem ainda não te conhece.",
    "Seu site não aparece no Google, não converte e não transmite a confiança que você construiu com esforço.",
    "Você já perdeu contratos para concorrentes menores simplesmente porque o digital deles era mais profissional.",
    "Cada dia sem um site que vende é um dia com custo invisível: clientes indo embora sem você saber.",
  ],
  solutions: [
    {
      title: "Sites que fazem o cliente pensar 'essa empresa é séria'",
      description:
        "Arquitetura visual e copy estratégica que posiciona sua empresa como referência antes mesmo do cliente ligar.",
    },
    {
      title: "Landing pages que transformam tráfego em agenda cheia",
      description:
        "Página única construída para um objetivo: converter visitantes em leads qualificados e contatos diretos.",
    },
  ],
  services: [
    {
      iconKey: "Globe",
      title: "Site Institucional",
      subtitle: "Para quem precisa ser levado a sério no digital",
      description:
        "Para empresas que já entregam bem, mas cujo site não transmite isso. Construímos a presença digital que suas vendas merecem. No ar em até 72 horas.",
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
      subtitle: "Cada clique com um único objetivo: converter",
      description:
        "Para quem tem tráfego mas não tem conversão. Uma página com copywriting estratégico, visual forte e CTA claro, pronta para rodar com anúncios ou orgânico em até 72 horas.",
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
      title: "Sua presença digital nunca fica parada",
      description:
        "Até 4 atualizações por mês para manter conteúdo, preços e serviços sempre atualizados. Sem precisar contratar ninguém novo cada vez.",
      tags: ["Até 4 atualizações/mês", "Ajustes visuais e textuais", "Padrão premium contínuo"],
    },
    {
      iconKey: "ShieldCheck",
      title: "Segurança que você não precisa pensar",
      description:
        "SSL ativo, backups automáticos e monitoramento 24/7. Se algo der errado, a gente resolve antes de você perceber.",
      tags: ["SSL e HTTPS", "Backups automáticos", "Uptime monitorado"],
    },
    {
      iconKey: "LineChart",
      title: "Mais resultado a cada mês",
      description:
        "Analisamos o desempenho real do seu site e propomos ajustes baseados em dados, não em achismos. O que funciona fica. O que não funciona, a gente muda.",
      tags: ["Teste A/B estratégico", "Análise de performance", "Otimização contínua"],
    },
    {
      iconKey: "MessageCircleMore",
      title: "Um time real do outro lado",
      description:
        "Sem ticket de suporte, sem fila de espera. Quando você precisar, tem alguém real para responder. Rápido.",
      tags: ["Resposta rápida", "Canal direto com o time", "Sem fila de chamado"],
    },
  ],
  process: [
    {
      title: "1. Você nos conta o que precisa",
      description:
        "Uma conversa de 15 minutos é suficiente para entendermos o negócio, o público e a mensagem que precisa chegar.",
    },
    {
      title: "2. A gente monta tudo",
      description:
        "Design, copywriting e desenvolvimento em paralelo. Sem etapas separadas, sem espera entre fases. Velocidade sem abrir mão da qualidade.",
    },
    {
      title: "3. No ar em até 72h",
      description:
        "Domínio, hospedagem, SSL e publicação. Você aprova, a gente ativa. Simples assim.",
    },
  ],
  companyTimeline: [
    {
      year: "2017",
      label: "Origem",
      description:
        "Tudo começou com software de gestão para restaurantes. A obsessão por resolver problemas reais com tecnologia nasceu aqui.",
    },
    {
      year: "2019",
      label: "Evolução",
      description:
        "O produto foi reinventado do zero. beSystem se tornou referência em PDV para o setor de alimentos.",
    },
    {
      year: "2022",
      label: "Projetos sob medida",
      description:
        "A demanda por projetos customizados chegou. Passamos a atender empresas que precisavam de mais do que um produto pronto.",
    },
    {
      year: "2026",
      label: "Presença digital",
      description:
        "Levamos o mesmo padrão de quem construiu software de verdade para sites, landing pages e presença digital completa.",
    },
  ],
  proofMetrics: [
    {
      value: "+8 anos",
      description:
        "construindo tecnologia para empresas brasileiras de múltiplos segmentos: financeiro, jurídico, transporte e serviços.",
    },
    {
      value: "6 projetos",
      description:
        "no portfólio ativo, em produção hoje. Sistemas, apps e sites entregues para clientes reais.",
    },
    {
      value: "72 horas",
      description:
        "do briefing à publicação. Com domínio, hospedagem e SSL inclusos. Sem custo adicional.",
    },
  ],
  faq: [
    {
      question: "A entrega em até 72 horas vale para qualquer projeto?",
      answer:
        "Vale para sites institucionais e landing pages no escopo padrão, cobrindo a grande maioria dos casos. Quando o projeto precisa de funcionalidades extras, deixamos claro no orçamento quanto vai levar e por quê. Sem surpresas.",
    },
    {
      question: "Hospedagem e domínio realmente já estão inclusos?",
      answer:
        "Sim, sem letras miúdas. Hospedagem em servidor profissional e domínio .com.br (ou .com) já estão no pacote. Você não vai receber uma cobrança surpresa depois.",
    },
    {
      question: "O site fica preparado para celular e Google?",
      answer:
        "Sim. Responsivo para todos os tamanhos de tela, SSL ativo e SEO base completo: título, meta description, sitemap, velocidade e estrutura semântica. Você sai com tudo que precisa para aparecer no Google desde o primeiro dia.",
    },
    {
      question: "Posso pedir alterações depois que o site for entregue?",
      answer:
        "Sim. Após a entrega, você pode contratar um plano de parceria para manutenção, atualizações e evolução do site. Os detalhes são apresentados junto com o orçamento. Você só paga se fizer sentido para o seu momento.",
    },
    {
      question: "Como funciona o processo depois que eu entrar em contato?",
      answer:
        "Você solicita o orçamento, a gente entra em contato em até 24 horas com uma proposta personalizada. Se aprovar, o briefing leva menos de 15 minutos. Em até 72 horas, o site está no ar.",
    },
    {
      question: "Vocês também cuidam do ambiente de e-mail da empresa?",
      answer:
        "Sim. Configuramos Google Workspace ou Microsoft 365 com ambiente profissional e seguro. Nada de 'seunome@gmail.com' em proposta comercial.",
    },
  ],
};
