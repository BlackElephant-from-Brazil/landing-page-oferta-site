# Prompt para Claude Opus 4.7 — Landing Page BlackElephant v2

## Instruções de Execução

Você é um engenheiro sênior e designer de produto trabalhando na landing page da empresa de tecnologia **BlackElephant**. Sua missão é evoluir a landing page atual para uma nova versão sem preços e com um CTA principal voltado para captação de leads qualificados.

**Antes de qualquer coisa, execute os seguintes skills em sequência:**

1. `/superpowers:brainstorming` — para entender profundamente o contexto e tomar decisões de design com intenção
2. `/ui-ux-pro-max:ui-ux-pro-max` — para garantir que o design seja de alto nível
3. `/frontend-design:frontend-design` — para implementar com qualidade de produção

**Depois de invocar os skills, siga rigorosamente o processo de cada um antes de escrever qualquer código.**

---

## Passo 1 — Configuração de Branch

```bash
git checkout -b develop-test-b
```

Trabalhe exclusivamente nesta branch. Não faça commits na `main` ou `develop`.

---

## Passo 2 — Contexto do Projeto

### Empresa
**BlackElephant** é uma empresa de tecnologia brasileira que entrega:
- Sites institucionais premium
- Landing pages de alta conversão
- Aplicativos web e mobile
- Sistemas personalizados (ERPs, CRMs, etc.)
- Automações (robôs de WhatsApp, integrações n8n/Make)
- E-commerces
- Blogs

**Tom de voz:** técnico, direto, sofisticado, sem firula. Fala com fundadores e gestores de PMEs que sabem o que querem mas precisam de um parceiro de tecnologia confiável.

### Tech Stack Existente (NÃO ALTERAR)
- **Framework:** Next.js (React 19, TypeScript)
- **Estilo:** Tailwind CSS 4 + CSS variables customizadas
- **Animações:** Framer Motion, GSAP (ScrollTrigger), Three.js
- **Ícones:** Lucide React
- **Fontes:** Outfit (display) + Barlow 300 (body)

### Design System Existente (MANTER FIELMENTE)
```css
--background: #0b0b0a;          /* Preto quase puro */
--foreground: #f5f6f1;          /* Off-white */
--brand: #39fe15;               /* Verde neon (cor primária) */
--brand-soft: rgba(57,254,21,0.14);
--brand-foreground: #081103;    /* Texto escuro para botões verdes */
--card: rgba(14,15,14,0.82);    /* Glassmorphism base */
--border: rgba(255,255,255,0.1);
--radius-lg: 1.5rem;
--radius-xl: 2rem;
```

### Componentes Existentes a Preservar
- `brand-lockup.tsx` — Logo BlackElephant
- `faq-accordion.tsx` — Accordion das perguntas frequentes
- `site-loader.tsx` — Loading overlay
- `particle-background.tsx` — Background Three.js com partículas
- `liquid-glass-v2.tsx` — Glassmorphism com tilt effect
- `BendSlider/` — Portfolio canvas slider (Three.js)

### Arquivo de Conteúdo
Todo o conteúdo textual está centralizado em `lib/landing-content.ts`. Atualize-o conforme necessário mantendo a mesma estrutura.

---

## Passo 3 — O Que Muda (Requisitos da v2)

### 3.1 Remover TODOS os preços

**Não deve existir nenhum valor monetário visível na página.** Isso inclui:
- Os 4 cards de produtos na seção "Ofertas" (R$ 1.198, R$ 1.998, R$ 798, R$ 1.298)
- Os 3 cards de suporte mensal (R$ 198/mês, R$ 298/mês, R$ 99/mês)
- Qualquer menção a "a partir de R$" ou similar no hero ou em outros pontos
- Remover o arquivo `lib/whatsapp.ts` e todas as suas referências

A lógica é simples: **sem preço, o usuário é forçado a entrar em contato para receber uma proposta personalizada**, aumentando a taxa de qualificação de leads.

### 3.2 Redesenhar a Seção de Serviços (ex-"Ofertas")

A seção "Ofertas" deve se tornar uma **seção de Serviços** que apresenta o que a BlackElephant entrega — sem preços, com foco em valor e benefícios.

Estrutura sugerida para cada card de serviço:
- Ícone representativo (Lucide React)
- Nome do serviço
- Descrição curta (1-2 linhas, benefício para o cliente)
- Lista de 3-5 entregáveis chave (ex: "SEO completo", "Hospedagem grátis", "Publicação em 72h")
- Botão CTA: `"Solicitar orçamento"`

**Serviços a cobrir:**
1. **Site Institucional** — autoridade digital, SEO, design premium, hospedagem grátis
2. **Landing Page** — conversão, tráfego pago, entrega rápida
3. **Aplicativo** — mobile ou web, UX personalizada
4. **Sistema Personalizado** — ERP, CRM, gestão sob medida
5. **Automação** — robôs de WhatsApp, integrações n8n/Make/Zapier
6. **E-commerce** — vendas online, catálogo, checkout

### 3.3 Redesenhar a Seção de Suporte (ex-"Suporte Mensal")

Transformar em uma seção sobre **continuidade e parceria**. Sem preços. Destacar:
- Atualizações recorrentes
- Monitoramento e segurança
- Evolução do produto (A/B, métricas, melhorias)
- Suporte técnico dedicado

Posicionar como "não entregamos e sumimos — somos parceiros de longo prazo".

### 3.4 Substituir TODOS os CTAs de WhatsApp

**Remover completamente qualquer botão, link ou menção ao WhatsApp como CTA principal.**

Isso inclui:
- Botão "Solicitar orçamento no WhatsApp" no hero
- Botões "Falar agora no WhatsApp" nos cards de oferta
- Botão flutuante de WhatsApp (`floating-whatsapp.tsx`)
- Botão no FAQ
- Botão no CTA final

**Substituir por:** botões com label `"Solicitar um orçamento personalizado"` que abrem um **modal de captação de leads** (ver Passo 4).

### 3.5 Remover o Floating WhatsApp Button

O componente `floating-whatsapp.tsx` deve ser substituído por um **botão flutuante de CTA** que abre o modal de orçamento diretamente. Mesmo comportamento visual (aparece após 70% do scroll), mas sem WhatsApp.

---

## Passo 4 — O Modal "Solicitar Orçamento Personalizado"

Este é o componente mais importante da v2. Deve ser construído como um componente React autônomo em `components/quote-modal.tsx`.

### Design
- Overlay escuro com blur (`backdrop-blur-xl`)
- Card centralizado com glassmorphism (`liquid-glass-v2` como base ou estilo equivalente)
- Largura máxima: `640px` no desktop, full-width no mobile
- Animação de entrada: fade + scale (Framer Motion `AnimatePresence`)
- Fechar com `Esc` ou clique no overlay

### Campos do Formulário

```
1. Nome *
   - Input text
   - Placeholder: "Seu nome completo"

2. Site da empresa (opcional)
   - Input text
   - Placeholder: "https://suaempresa.com.br"
   - Label com badge "(opcional)"

3. E-mail *
   - Input email
   - Placeholder: "voce@empresa.com.br"

4. WhatsApp *
   - Input tel
   - Placeholder: "(11) 99999-9999"
   - Máscara de telefone brasileiro

5. Tipo de projeto *
   - Multi-select em GRID (não dropdown)
   - Layout: grid de 2 colunas no mobile, 3-4 colunas no desktop
   - Cada opção é um "chip" / "tag" clicável
   - Estado selecionado: background brand green (#39fe15), texto dark
   - Estado não selecionado: borda sutil, texto muted
   - Opções:
     [ App ]          [ Sistema ]       [ Landing Page ]
     [ Site ]         [ Robô WhatsApp ] [ E-commerce ]
     [ Blog ]         [ Outro ]

6. Resumo do projeto *
   - Textarea (4 linhas mínimo, expansível)
   - Placeholder: "Descreva brevemente o que você precisa. Ex: quero um site institucional para minha clínica odontológica com formulário de agendamento..."
   - Contador de caracteres (mín. 50 chars para habilitação do submit)
```

### Validação
- Campos obrigatórios marcados com `*`
- Validação client-side antes do submit
- Mensagens de erro inline (abaixo do campo), nunca alert()
- Botão de submit desabilitado até formulário válido

### Envio do Formulário
- Enviar via `fetch` para um endpoint simples
- Endpoint: `POST /api/quote` (criar `app/api/quote/route.ts`)
- O endpoint deve, por enquanto, apenas logar o payload e retornar `{ success: true }`
- Deixar um comentário claro no endpoint indicando onde integrar Resend, Mailgun ou similar
- Após sucesso: substituir o formulário por uma tela de confirmação com mensagem "Recebemos seu pedido! Em breve nosso time entrará em contato." e botão "Fechar"
- Em caso de erro: exibir mensagem de erro inline, não substituir o formulário

### Acessibilidade
- `role="dialog"` e `aria-modal="true"` no card do modal
- `aria-label="Solicitar orçamento personalizado"`
- Focus trap dentro do modal (Tab não sai do modal enquanto aberto)
- `aria-live="polite"` na área de mensagens de erro/sucesso

---

## Passo 5 — Seções a Manter Sem Alteração de Estrutura

Estas seções devem ser mantidas com o mesmo conteúdo e estrutura, apenas com CTAs atualizados para o novo padrão:

1. **Hero** — Manter headline, subheading, trust badges e stats. Trocar CTA primário.
2. **Diferencial (Shift)** — Manter pain points e solutions.
3. **Como Acontece (Processo 3 passos)** — Manter.
4. **Trajetória (Timeline)** — Manter (2017, 2019, 2022, 2026).
5. **Portfólio** — Manter os 6 projetos e o BendSlider.
6. **FAQ** — Manter perguntas, remover qualquer referência a preços nas respostas.
7. **Rodapé / CTA Final** — Manter estrutura, atualizar CTA.

---

## Passo 6 — Critérios de Aceitação (Definition of Done)

A v2 está pronta quando:

- [ ] Branch `develop-test-b` criada e todos commits nela
- [ ] Nenhum valor monetário (R$) visível em qualquer parte da página
- [ ] Nenhum link ou menção ao WhatsApp como CTA principal
- [ ] Botão flutuante de WhatsApp removido e substituído por botão de modal
- [ ] Modal de orçamento funcional com todos os 6 campos
- [ ] Multi-select de tipo de projeto em grid (não dropdown)
- [ ] Endpoint `/api/quote` criado e funcionando (mesmo que apenas logando)
- [ ] Validação client-side em todos os campos obrigatórios
- [ ] Tela de confirmação após submit bem-sucedido
- [ ] Seção de Serviços (ex-Ofertas) redesenhada sem preços
- [ ] Seção de Suporte redesenhada sem preços
- [ ] Design system mantido fielmente (cores, fontes, glass, animações)
- [ ] Responsivo: mobile (320px+), tablet (768px+), desktop (1024px+)
- [ ] Build de produção sem erros TypeScript (`next build`)
- [ ] Acessibilidade básica no modal (focus trap, aria labels)

---

## Passo 7 — Diretrizes de Qualidade para os Skills

### Para `/ui-ux-pro-max:ui-ux-pro-max`
- Estilo: **dark premium tech** — não é minimalismo neutro, é sophistication com personalidade
- O modal deve se sentir como parte nativa do design system, não um componente genérico
- Os chips de seleção de tipo de projeto devem ter micro-interações satisfatórias (scale, glow verde ao selecionar)
- Use glassmorphism no modal consistente com `liquid-glass-v2.tsx`
- O CTA principal em toda a página deve ter o mesmo peso visual que hoje tem o botão verde de WhatsApp

### Para `/frontend-design:frontend-design`
- Não gere código genérico de formulário — ele deve parecer artesanal e único
- Os chips de multi-select devem ter transição suave com Framer Motion
- O modal deve usar `AnimatePresence` do Framer Motion para entrada/saída
- Mantenha a coerência com `globals.css` e as classes utilitárias existentes (`.glass-panel`, `.section-kicker`, etc.)
- Escreva TypeScript estrito — sem `any`, sem supressão de erros

---

## Referências de Contexto

### Mensagem de Marca
> "Tecnologia com identidade. Entregamos soluções digitais premium para empresas que entendem que presença online é patrimônio."

### Principais Diferenciais a Comunicar
- Entrega rápida (72h para sites/LPs)
- Design premium (não template)
- Código próprio (não plataforma fechada)
- Parceria contínua (suporte, evolução, A/B)
- Segurança e SEO inclusos

### Estrutura de Arquivos para Novos Componentes
```
components/
  quote-modal.tsx          ← modal principal
  floating-cta.tsx         ← botão flutuante (substituir floating-whatsapp)

app/
  api/
    quote/
      route.ts             ← endpoint POST

lib/
  landing-content.ts       ← atualizar textos (remover preços, atualizar serviços)
```

---

## Observações Finais

- Se você encontrar ambiguidade, prefira a solução mais simples e documentada
- Não adicione dependências sem necessidade — o projeto já tem Framer Motion, GSAP e Three.js
- Não crie arquivos de documentação além dos já especificados
- Mantenha todos os commits atômicos e descritivos
- Ao finalizar, execute `next build` e certifique-se de que não há erros

**Boa sorte, Opus.**
