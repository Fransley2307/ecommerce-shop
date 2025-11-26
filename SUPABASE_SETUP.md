# 🚀 Guia de Configuração - Supabase e Variáveis de Ambiente

## Passo 1: Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Clique em **"Sign In"** e faça login com sua conta GitHub ou email
3. Clique em **"New Project"**
4. Preencha:
   - **Project Name:** `ecommerce-shop`
   - **Database Password:** Escolha uma senha forte e salve em local seguro
   - **Region:** Escolha a mais perto de você (ex: `South America - São Paulo`)
5. Clique em **"Create New Project"** e aguarde ~2 minutos

## Passo 2: Copiar Credenciais

Depois que o projeto for criado:

1. No menu lateral, clique em **Settings** (engrenagem)
2. Vá até **API**
3. Copie:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key

## Passo 3: Atualizar .env do Frontend

No arquivo `.env` do `ecommerce-shop`, adicione:

```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

**Importante:** Substitua os valores pelos que você copiou no Passo 2.

## Passo 4: Testar Autenticação

1. Inicie o frontend: `npm run dev`
2. Vá para `http://localhost:5173/signup`
3. Crie uma conta com seu email
4. Faça login com as credenciais

**Pronto!** ✅ A autenticação está funcionando!

## 📝 Próximos Passos (Opcional)

Para integrar com o backend e vincular usuários Supabase à tabela `Customer`:

1. No backend, você pode criar uma função que recebe o `user_id` do Supabase
2. Salvar esse ID quando um pedido é criado
3. Usar esse ID para filtrar pedidos por usuário

Exemplo de integração:
```typescript
// No backend (orders.service.ts)
async findByUserId(userId: string) {
  return await this.orderRepository.find({
    where: { customerId: userId }
  });
}
```

---

**Dúvidas?** Me avisa! 🚀
