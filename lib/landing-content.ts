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
    body: string;
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
    body: string;
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
    body: "Você não precisa de mais um gestor caro que vai sumir no meio do projeto. Precisa de um studio que já fez isso mais de 200 vezes, que sabe o que converte, e que coloca tudo no ar em até 72 horas com hospedagem e domínio inclusos. Sem surpresa no prazo. Sem surpresa no preço.",
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
    body: "Cada dia com uma página ruim é um dia perdendo cliente para o concorrente. Chama a gente no WhatsApp agora e em até 72 horas seu site ou landing page está pronto.",
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
