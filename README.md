# 🧭 Nortus – Desafio React (Loomi)

> Plataforma de **inteligência artificial para times de vendas e atendimento**, desenvolvida como parte do **Desafio React da Loomi**.
>
> A aplicação simula o sistema **Nortus**, com autenticação, visualização de indicadores (KPIs) e gestão de tickets, consumindo a **API mockada oficial** da Loomi.

---

## 🚀 Sumário

- [Visão Geral](#-visão-geral)
- [Stack Principal](#-stack-principal)
- [Setup do Projeto](#-setup-do-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Padrões e Convenções](#-padrões-e-convenções)
- [Fluxo Git / Branches](#-fluxo-git--branches)
- [APIs e Endpoints](#-apis-e-endpoints)
- [Licença](#-licença)

---

## 💡 Visão Geral

O **Nortus** é uma interface web desenvolvida com **Next.js + TypeScript**, seguindo princípios de **Clean Architecture simplificada** para front-end.  
O projeto consome uma **API mockada** disponibilizada pela Loomi e simula fluxos de login, dashboards e gestão de tickets.

---

## 🧩 Stack Principal

| Categoria                   | Tecnologias                                                                       |
| --------------------------- | --------------------------------------------------------------------------------- |
| **Framework**               | [Next.js 15+ (App Router)](https://nextjs.org/docs/app)                           |
| **Linguagem**               | [TypeScript](https://www.typescriptlang.org/)                                     |
| **Estilos**                 | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Validação**               | [Zod](https://zod.dev/)                                                           |
| **Gerenciamento de Estado** | [Zustand](https://zustand-demo.pmnd.rs/)                                          |
| **HTTP Client**             | [Axios](https://axios-http.com/)                                                  |
| **Data Fetching & Cache**   | [TanStack Query (React Query)](https://tanstack.com/query)                        |
| **Feedbacks**               | [Sonner](https://sonner.emilkowal.ski/)                                           |
| **Autenticação (mock)**     | Cookies + Middleware do Next.js                                                   |
| **Gráficos**                | [ApexCharts.js](https://apexcharts.com/)                                          |
| **Design Tokens**           | Definidos via `@theme inline` (Tailwind 4)                                        |

---

## ⚙️ Setup do Projeto

```bash
# 1. Clonar o repositório
git clone https://github.com/<seu-usuario>/nortus.git
cd nortus

# 2. Instalar dependências
pnpm install

# 3. Rodar o ambiente de desenvolvimento
pnpm dev

# 4. Gerar build de produção
pnpm build && pnpm start
```

### 🔐 Variáveis de Ambiente

> Arquivo `.env.local`

```env
NEXT_PUBLIC_API_BASE_URL=https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2
AUTH_TOKEN_KEY=nortus_token
```

---

## 🧱 Estrutura de Pastas

```
src/
├── app/                       # Rotas e páginas (App Router)
│   ├── layout.tsx             # Layout global da aplicação
│   ├── page.tsx               # Página inicial (Dashboard)
│   └── ...                    # Outras páginas (login, rotas privadas, etc.)
│
├── components/                # Componentes globais reutilizáveis
│   ├── ui/                    # Componentes base (Button, Input, Modal, Loader...)
│   ├── charts/                # Gráficos (ApexCharts)
│   ├── tables/                # Tabelas reutilizáveis
│   └── feedback/              # Toasts, Skeletons, etc.
│
├── features/                  # Domínios funcionais (arquitetura modular)
│   ├── components/            # Componentes específicos de cada feature
│   ├── hooks/                 # Hooks locais por domínio
│   ├── schemas/               # Schemas de validação (Zod)
│   └── services/              # Comunicação com API e lógica de domínio
│
├── hooks/                     # Hooks globais (useAuth, useQueryApi, etc.)
│
├── lib/
│   ├── api/                   # Configuração do Axios e endpoints
│   │   ├── axios.ts
│   │   └── endpoints.ts
│   ├── store/                 # Zustand stores globais (authStore, uiStore)
│   ├── auth/                  # Helpers de autenticação (cookies, tokens)
│   └── utils/                 # Funções utilitárias (formatDate, debounce, etc.)
│
├── models/                    # Tipos, constantes e modelos de domínio
│   ├── entity.model.ts
│   └── index.ts
│
├── providers/                 # Providers globais (ThemeProvider, QueryClient, etc.)
│   └── app-provider.tsx
│
├── styles/                    # Estilos globais e design tokens
│   └── globals.css
│
├── types/                     # Tipos auxiliares e extensões globais
│   └── next.d.ts
│
├── middleware.ts              # Middleware de autenticação (rotas privadas)
└── tests/                     # Testes unitários e de integração
```

---

## 🧠 Padrões e Convenções

### 🧩 Nomenclatura de Branches

| Tipo    | Exemplo              |
| ------- | -------------------- |
| Feature | `feature/login-page` |
| Fix     | `fix/ticket-filter`  |
| Chore   | `chore/setup-eslint` |
| Docs    | `docs/readme`        |

### 🧠 Commits Semânticos

```
feat: add login form with validation
fix: adjust axios interceptor for token
chore: configure eslint + prettier
docs: update README with project structure
```

---

## 🌱 Fluxo Git / Branches

1. Desenvolva sempre em branches `feature/*`
2. Crie um **Pull Request** para `develop`
3. Após revisão, faça merge em `main`
4. Deploy automatizado configurado na **Vercel**

---

## 🌐 APIs e Endpoints (Mock da Loomi)

| Recurso                 | Endpoint                  |
| ----------------------- | ------------------------- |
| **Login**               | `/login.json`             |
| **Dashboard (KPIs)**    | `/dash.json`              |
| **Mapa de Impacto**     | `/map.json`               |
| **Tickets**             | `/ticket-management.json` |
| **Simulador de Planos** | `/plan.json`              |
| **Chat / IA**           | `/chat.json`              |
| **Visão 360° Cliente**  | `/360-view.json`          |

📦 **Base URL:**  
`https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2`

---

## 🧰 Bibliotecas de Suporte

| Categoria           | Lib                           |
| ------------------- | ----------------------------- |
| UI Base             | shadcn/ui                     |
| Toasts              | sonner                        |
| Validação           | zod                           |
| Requisições e Cache | axios + @tanstack/react-query |
| Estado Global       | zustand                       |
| Estilos             | tailwindcss v4                |
| Tema                | next-themes                   |

---

## 🧾 Licença

Este projeto foi desenvolvido exclusivamente para o **Desafio React da Loomi**.  
Uso livre para fins de estudo e portfólio.

---

## 👨‍💻 Autor

**[Seu Nome Aqui]**  
Front-end Developer  
📧 [seuemail@email.com]  
🌐 [linkedin.com/in/seuusuario](https://linkedin.com/in/seuusuario)
