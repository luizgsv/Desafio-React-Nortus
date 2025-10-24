# 🚀 Desafio React – Nortus

Painel administrativo desenvolvido em **Next.js 15** com autenticação, dashboard de KPIs, gestão de tickets e arquitetura escalável por features.  
O projeto foi criado com foco em **boas práticas de arquitetura front-end, componentização e experiência do usuário (UI/UX)**.

---

## 🗂️ Tabela de Conteúdos
1. [🏷️ Visão Geral do Projeto](#️-visão-geral-do-projeto)  
2. [⚙️ Tecnologias Utilizadas](#-tecnologias-utilizadas)  
3. [📁 Estrutura do Projeto](#-estrutura-do-projeto)  
4. [🔐 Fluxo de Autenticação](#-fluxo-de-autenticação)  
5. [📊 Módulo de Dashboard](#-módulo-de-dashboard)  
6. [🎫 Módulo de Tickets](#-módulo-de-tickets)  
7. [💬 Chat Placeholder](#-chat-placeholder)  
8. [🎨 UI e UX](#-ui-e-ux)  
9. [📂 Integração com API e Mocks](#-integração-com-api-e-mocks)  
10. [🧠 Gerenciamento de Estado](#-gerenciamento-de-estado)  
11. [⚙️ Variáveis de Ambiente](#️-variáveis-de-ambiente)  
12. [🧪 Como Executar o Projeto](#-como-executar-o-projeto)  
13. [🚀 Melhorias Futuras](#-melhorias-futuras)  
14. [🤖 Uso de IA e Assistência de Código](#-uso-de-ia-e-assistência-de-código)  
15. [📄 Autor e Licença](#-autor-e-licença)

---

## 🏷️ Visão Geral do Projeto

**Nome:** Desafio React – Acompanhante Luca  
**Propósito:** Painel administrativo com autenticação, visualização de KPIs, gestão de tickets e interface modular escalável.  

O desafio visa demonstrar:
- Domínio do **Next.js (App Router)**
- Uso de **Zustand** para gerenciamento global de estado  
- **Formulários validados com Zod + React Hook Form**  
- **UI consistente** baseada em shadcn/ui  
- Consumo de **endpoints mockados e reais**  
- Padrões de arquitetura e componentização modernos  

---

## ⚙️ Tecnologias Utilizadas

- **Next.js 15 (App Router)** + **React 19**
- **TypeScript 5**
- **TailwindCSS 4** + **shadcn/ui (Radix Primitives)**
- **Zod** + **React Hook Form**
- **Zustand 5**
- **TanStack Query (React Query)**
- **Axios**
- **ApexCharts** + **React ApexCharts**
- **MapLibre GL**
- **Sonner** (toasts)
- **Lucide Icons**

---

## 📁 Estrutura do Projeto

Organização modular por domínio:

```
src/
 ├── app/                     # Rotas, layouts e middleware
 │   ├── api/auth/            # Endpoints: login, logout e cookies
 │   ├── (private)/           # Rotas privadas (Dashboard, Tickets, Chat)
 │   └── (public)/login/      # Rota pública
 │
 ├── components/              # Componentes base (Button, Card, Dialog, etc.)
 │
 ├── features/
 │   ├── dashboard/           # KPIs, gráficos e mapa
 │   ├── tickets/             # Gestão de tickets
 │   └── chat/                # Placeholder (rota simulada)
 │
 ├── lib/                     # Configurações globais, endpoints e utils
 ├── store/                   # Zustand stores globais
 └── styles/                  # Estilos globais e design tokens
```

---

---

## 📋 Gestão do Projeto

O acompanhamento das atividades, tarefas e progresso do desenvolvimento foi feito utilizando o recurso de **Projects do GitHub**,  
disponível neste mesmo repositório.  

Lá é possível visualizar:
- O **Kanban completo** com status das tarefas (A Fazer, Em Progresso, Concluído e Adiado/On Hold);  
- As **etapas de implementação** correspondentes aos módulos (Dashboard, Tickets, UI e Autenticação).  

🔗 A gestão do projeto pode ser acessada diretamente pela aba **“Projects”** do repositório no GitHub.

## 🔐 Fluxo de Autenticação

Fluxo de autenticação completo implementado:

- Login validado com **React Hook Form + Zod**, com feedback visual via **Sonner**  
- API `POST /api/auth/set-cookie` cria **cookie HTTP-only** com o token  
- **Middleware (`middleware.ts`)** protege todas as rotas privadas e redireciona para `/login` se não houver autenticação  
- API `POST /api/auth/logout` remove o cookie e limpa dados locais (`localStorage`)  
- **Dropdown de usuário na sidebar** permite logout seguro  

---

## 📊 Módulo de Dashboard

Componentes principais:

| Componente | Descrição |
|-------------|------------|
| **KpiGraph** | Gráfico de evolução dos KPIs (ARPU, Retenção, Conversão, Churn) usando ApexCharts |
| **KpiStats** | Cards com valores e variação percentual |
| **ClientMap** | Mapa de clientes ativos com integração MapLibre |
| **SegmentImpactCard** | Gráfico donut de impacto por segmento |
| **ActiveClientsTable** | DataTable com filtros, ordenação e tipagem forte |

Endpoints: `/dash.json` e `/map.json`

---

## 🎫 Módulo de Tickets

Funcionalidades principais:

- 📋 **Tabela de tickets** com filtros (Status, Prioridade, Responsável)
- 🔍 Busca por **cliente, assunto ou ID**
- 🔄 **Paginação controlada por Zustand**
- ✏️ **Ações por linha:** Editar e Ver
- 🧠 **Modal de criação** (`CreateTicketForm`) validado com Zod
- ⚙️ **Store global (`useTicketsStore`)** com estado derivado
- 💾 **Integração com mocks de API** (`/ticket-management.json`)
- 🔔 **Toasts** informativos de sucesso e erro

Arquivos principais:
```
src/features/tickets/components/tickets-table.tsx
src/features/tickets/components/create-ticket-form.tsx
src/features/tickets/components/create-ticket-button.tsx
src/features/tickets/schema/create-ticket.schema.ts
src/features/tickets/store/tickets.store.ts
src/features/tickets/services/get-tickets.service.ts
```

---

## 💬 Chat Placeholder

A rota `/chat` existe na sidebar, porém **não possui implementação funcional**.  
Atualmente, redireciona para a página `not-found.tsx`.  
A arquitetura já está preparada para integração futura com **chat em tempo real** (WebSocket ou Server Actions).

---

## 🎨 UI e UX

- **Design tokens** configurados em `src/styles/globals.css`
- **Cores, sombras e fontes** padronizadas (inclui `--shadow-accent`)
- **Componentes base:** `Card`, `Button`, `Input`, `Select`, `Dialog`, `Table`
- Páginas auxiliares:
  - `loading.tsx` → tela de carregamento com animação
  - `not-found.tsx` → página 404 personalizada
- Sidebar com **menu lateral fixo e dropdown de usuário (Perfil / Logout)**

Exemplo de botão principal:
```tsx
<Button className="bg-accent text-white shadow-[var(--shadow-accent)] hover:bg-accent/80">
  Ação
</Button>
```

---

## 📂 Integração com API e Mocks

O sistema consome **mock APIs públicas** hospedadas pela empresa avaliadora:

```
NEXT_PUBLIC_API_BASE_URL=https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2
```

Endpoints utilizados:
```
/dash.json
/map.json
/ticket-management.json
/chat.json
```

> Todos os dados são carregados via **Axios + React Query**, com cache e revalidação automática.

---

## 🧠 Gerenciamento de Estado

Gerenciado com **Zustand**, com stores independentes por domínio:

- **Tickets Store:** controla lista, filtros, paginação e criação  
- **Dashboard Store:** leitura de KPIs e filtros de clientes  
- **UI Store (opcional):** controle de modais e preferências  

Exemplo simplificado:
```ts
const { tickets, currentPage, totalPages, setPage } = useTicketsStore();
setPage(currentPage + 1);
```

---

## ⚙️ Variáveis de Ambiente

Arquivo `.env.local` esperado:

```env
NEXT_PUBLIC_API_BASE_URL=https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2
NEXT_PUBLIC_AUTH_TOKEN_KEY=auth_token
NODE_ENV=development
```

---

## 🧪 Como Executar o Projeto

### Pré-requisitos
- Node.js **20+**
- pnpm **8+**

### Passos
```bash
git clone <repo-url>
cd desafio-react-luca
pnpm install

# (opcional) criar .env.local
cp .env.example .env.local

pnpm dev
# Acesse http://localhost:3000
```

### Build de Produção
```bash
pnpm build && pnpm start
```

---

## 🚀 Melhorias Futuras

- 💬 Implementar chat em tempo real (WebSocket ou Server Actions)  
- ⚙️ Integração com backend real para login e CRUD  
- 🔔 Sistema de notificações in-app  
- 🌓 Tema dark/light global com preferências salvas  
- 🧪 Testes unitários e E2E (Vitest / Playwright)  
- 📈 Métricas e observabilidade (Sentry / LogRocket)

---

## 🤖 Uso de IA e Assistência de Código

Durante o desenvolvimento, foram utilizadas **ferramentas de inteligência artificial** e **assistentes de código** para otimizar a produtividade e padronizar o projeto.

**Ferramentas utilizadas:**
- **ChatGPT (OpenAI GPT-5)** → apoio na estruturação do projeto, tipagem de dados, refatoração de componentes e documentação.  
- **GitHub Copilot** → autocompletar de funções, props e JSX repetitivos.  

> Todas as implementações, integrações e revisões finais foram feitas manualmente, com entendimento completo do código e responsabilidade técnica integral.

---

## 📄 Autor e Licença

**Autor:** Luiz Gustavo de Souza Vargas  
**LinkedIn:** [linkedin.com/in/luiz-vargas](https://www.linkedin.com/in/luiz-vargas)  
**Licença:** MIT — uso permitido para fins de estudo, portfólio e extensão do projeto.
