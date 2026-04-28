import type { Metadata } from "next";
import { Barlow, Outfit } from "next/font/google";
import { LiquidGlassProvider } from "@/components/liquid-glass-v2";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "700"],
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  weight: ["300"],
});

export const metadata: Metadata = {
  title: "BlackElephant | Sites, Landing Pages e Apps em até 72 horas",
  description:
    "Sites, landing pages e apps modernos, sofisticados e elegantes com entrega rápida, domínio e hospedagem grátis, SEO completo e suporte recorrente.",
  keywords: [
    "criação de sites",
    "landing page",
    "desenvolvimento de apps",
    "site responsivo",
    "teste A/B",
    "BlackElephant",
  ],
  openGraph: {
    title: "BlackElephant | Sites, Landing Pages e Apps em até 72 horas",
    description:
      "Sua presença digital pronta em até 72 horas com visual premium, segurança, SEO e suporte mensal opcional.",
    siteName: "BlackElephant",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "BlackElephant | Sites, Landing Pages e Apps em até 72 horas",
    description:
      "Sites, landing pages e apps sob medida com entrega rápida, A/B test, suporte e ambiente digital seguro.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${outfit.variable} ${barlow.variable} bg-background text-foreground antialiased`}
      >
        <LiquidGlassProvider>{children}</LiquidGlassProvider>
      </body>
    </html>
  );
}
