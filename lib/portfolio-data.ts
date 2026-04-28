export interface PortfolioProject {
  slug: string;
  name: string;
  type: string;
  description: string;
  tech: string[];
  link: string;
  logo: string;
  images: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "banco-bhg",
    name: "Banco BHG",
    type: "Site institucional + Software de Gestão",
    description:
      "Site institucional completo mais software de gestão para gerenciamento de toda a operação — financeiro, contratos, clientes, parceiros e impostos. Relatórios via WhatsApp e email, exportação em xlsx e PDF.",
    tech: ["Next.js", "Supabase", "n8n"],
    link: "https://hubfive.com.br/",
    logo: "/portfolio/banco-bhg/bhg-logo-dark.png",
    images: Array.from({ length: 9 }, (_, i) => `/portfolio/banco-bhg/${i + 1}.png`),
  },
  {
    slug: "full-finance-hubfive",
    name: "Full Finance HubFive",
    type: "Site institucional + Software de Gestão",
    description:
      "Software de gestão completo cobrindo RH, financeiro, vendas e estratégico/administrativo. Envio de relatórios via WhatsApp e email, exportação em xlsx e PDF, com qualidade gráfica fiel à identidade da marca.",
    tech: ["Next.js", "Supabase", "n8n"],
    link: "https://hubfive.com.br/",
    logo: "/portfolio/full-finance-hubfive/Hubfive_logo_dark.png",
    images: Array.from({ length: 11 }, (_, i) => `/portfolio/full-finance-hubfive/${i + 1}.png`),
  },
  {
    slug: "kz-servicos",
    name: "KZ Serviços",
    type: "APP Cliente + APP Prestador + Software de Gestão",
    description:
      "Software de gestão de agendamento de prestadores de serviço com gestão financeira, escala, relatórios e exportação. App para prestadores e app para clientes fazerem solicitações de serviços e viagens.",
    tech: ["Next.js", "Supabase", "n8n"],
    link: "https://kz-serviços.netlify.app/",
    logo: "/portfolio/kz-servicos/logo.png",
    images: Array.from({ length: 26 }, (_, i) => `/portfolio/kz-servicos/${i + 1}.png`),
  },
  {
    slug: "solumart-servicos",
    name: "Solumart Serviços",
    type: "APP + Software de Gestão",
    description:
      "Software de gestão de agendamento de prestadores com gestão financeira, escala e relatórios. App entregue para prestadores acompanharem suas atividades futuras.",
    tech: ["Bubble", "Make"],
    link: "https://solumart.bubbleapps.io/",
    logo: "/portfolio/solumart-servicos/solumart_logo_dark.png",
    images: Array.from({ length: 11 }, (_, i) => `/portfolio/solumart-servicos/${i + 1}.png`),
  },
  {
    slug: "transportadora-sabas",
    name: "Transportadora Sabas",
    type: "Site institucional + Software de Gestão",
    description:
      "Site completo com home, veículos, categorias, quem somos e contato — responsivo, SEO e segurança completos. Software de gestão de viagens, financeiro, escala de motoristas e relatórios.",
    tech: ["Next.js", "Bubble", "n8n"],
    link: "https://sabas.com.br/",
    logo: "/portfolio/transportadora-sabas/sabas_logo_dark.svg",
    images: Array.from({ length: 12 }, (_, i) => `/portfolio/transportadora-sabas/${i + 1}.png`),
  },
  {
    slug: "verite-pericias-judiciais",
    name: "Vérité Perícias Judiciais",
    type: "Site institucional",
    description:
      "Site completo com home, sobre nós, serviços, páginas individuais por serviço, página da fundadora e contato com envio de email. Responsivo, SEO e segurança completos.",
    tech: ["Next.js", "Supabase", "n8n"],
    link: "https://institutoverite.com.br/",
    logo: "/portfolio/verite-pericias-judiciais/logo_verite_dark.svg",
    images: Array.from({ length: 8 }, (_, i) => `/portfolio/verite-pericias-judiciais/${i + 1}.png`),
  },
];
