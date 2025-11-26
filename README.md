# 🛒 E-commerce Shop - Loja Virtual

## 📋 Sobre o Projeto

Aplicação frontend de uma loja virtual completa desenvolvida como projeto universitário. Sistema de e-commerce com catálogo de produtos, carrinho de compras, autenticação de usuários, favoritos, avaliações e finalização de pedidos.

## 🚀 Tecnologias Utilizadas

- **React 19** - Biblioteca para construção da interface
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server ultra-rápido
- **React Router v7** - Roteamento e navegação
- **TailwindCSS** - Framework CSS utility-first
- **shadcn/ui + Radix UI** - Componentes acessíveis e estilizados
- **React Query (TanStack Query)** - Gerenciamento de estado assíncrono e cache
- **Axios** - Cliente HTTP para requisições à API
- **Supabase** - Autenticação e armazenamento
- **Lucide React** - Ícones modernos

## ✨ Funcionalidades

### 🏠 Navegação e Catálogo
- Página inicial com produtos em destaque
- Catálogo completo de produtos
- Filtros por categoria e busca
- Visualização detalhada de produtos
- Paginação de resultados

### 🔐 Autenticação
- Cadastro de novos usuários
- Login com email e senha
- Recuperação de senha
- Perfil do usuário
- Proteção de rotas privadas

### 🛍️ Carrinho de Compras
- Adicionar/remover produtos
- Ajustar quantidades
- Cálculo automático de totais
- Persistência no navegador
- Resumo do pedido

### ⭐ Favoritos
- Marcar produtos favoritos
- Lista de produtos favoritos
- Sincronização com backend

### 💬 Avaliações
- Visualizar avaliações de produtos
- Criar novas avaliações
- Sistema de estrelas (1-5)
- Comentários dos usuários

### 📦 Pedidos
- Checkout completo
- Formulário de endereço de entrega
- Histórico de pedidos
- Detalhes do pedido
- Status de acompanhamento

## 📁 Estrutura do Projeto

```
ecommerce-shop/
├── public/              # Arquivos estáticos
├── src/
│   ├── app/            # Páginas principais da aplicação
│   ├── cases/          # Módulos de negócio (products, auth, cart, etc)
│   │   ├── account/    # Perfil do usuário
│   │   ├── auth/       # Autenticação (login, registro)
│   │   ├── cart/       # Carrinho de compras
│   │   ├── categories/ # Categorias de produtos
│   │   ├── customers/  # Dados do cliente
│   │   ├── favorites/  # Produtos favoritos
│   │   ├── orders/     # Pedidos e checkout
│   │   ├── products/   # Catálogo de produtos
│   │   └── reviews/    # Avaliações de produtos
│   ├── components/     # Componentes reutilizáveis
│   │   ├── layout/     # Layout da aplicação (header, footer)
│   │   └── ui/         # Componentes UI (botões, cards, inputs)
│   ├── contexts/       # Context API (Auth, Cart, Favorites)
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Configurações e utilitários
│   └── pages/          # Páginas de roteamento
├── .env                # Variáveis de ambiente
└── package.json        # Dependências do projeto
```

## 🔧 Configuração do Ambiente

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Backend rodando (ecommerce-backend)
- Projeto Supabase configurado

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-key
```

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Entre na pasta do projeto
cd ecommerce-shop

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📜 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa o linter
```

## 🌐 Rotas da Aplicação

- `/` - Página inicial
- `/products` - Catálogo de produtos
- `/products/:id` - Detalhes do produto
- `/cart` - Carrinho de compras
- `/checkout` - Finalizar pedido
- `/login` - Login de usuário
- `/register` - Cadastro de usuário
- `/account` - Perfil do usuário
- `/orders` - Histórico de pedidos
- `/orders/:id` - Detalhes do pedido
- `/favorites` - Produtos favoritos

## 🔗 Integração com Backend

A aplicação consome a API REST do backend NestJS:

- **Base URL**: `http://localhost:3000`
- **Autenticação**: JWT via Supabase
- **Endpoints principais**:
  - `/products` - Produtos
  - `/categories` - Categorias
  - `/orders` - Pedidos
  - `/favorites` - Favoritos
  - `/reviews` - Avaliações
  - `/customers` - Clientes

## 🎨 Estilização

- **TailwindCSS**: Utility-first CSS framework
- **shadcn/ui**: Componentes pré-estilizados e acessíveis
- **Radix UI**: Primitivos de UI acessíveis
- Design responsivo para mobile e desktop

## 🔐 Autenticação

Autenticação gerenciada pelo **Supabase Auth**:

- Email/Senha
- Tokens JWT
- Sessões persistentes
- Verificação de email (configurável)

## 📦 Gerenciamento de Estado

- **React Query**: Cache e sincronização com API
- **Context API**: Estados globais (Auth, Cart, Favorites, Search)
- **LocalStorage**: Persistência de carrinho

## 🚦 Como Usar

1. **Acesse a loja** em `http://localhost:5173`
2. **Navegue pelos produtos** na página inicial ou catálogo
3. **Crie uma conta** ou faça login
4. **Adicione produtos ao carrinho**
5. **Marque produtos como favoritos**
6. **Avalie produtos** que você conhece
7. **Finalize o pedido** no checkout
8. **Acompanhe seus pedidos** na área de conta

## 👥 Autor

Desenvolvido como projeto universitário - Fase 1 a 4

## 📄 Licença

Este projeto é de uso acadêmico.

---

⭐ **Nota**: Certifique-se de que o backend (ecommerce-backend) está rodando antes de iniciar a aplicação!

---

## Expanding the ESLint configuration (React + Vite)

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
