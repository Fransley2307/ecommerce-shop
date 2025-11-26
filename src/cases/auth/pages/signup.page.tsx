import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, AlertCircle } from "lucide-react";

export function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugJson, setDebugJson] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password || !name || !confirmPassword) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    const signUpRes = await signUp(email, password, name);
    // Save debug JSON (dev only)
    if (import.meta.env.DEV) setDebugJson(JSON.stringify(signUpRes, null, 2));
    // Log full response to help debug auth flow (dev only)
    if (import.meta.env.DEV) console.log("signUp response:", signUpRes);

    if (signUpRes.error) {
      setError(signUpRes.error);
      setLoading(false);
      return;
    }

    // If Supabase returned a user object, proceed to home
    // Otherwise most likely the project requires email confirmation — show a friendly message
    const createdUser = (signUpRes.data as unknown as { user?: unknown })?.user;
    if (createdUser) {
      navigate("/");
      return;
    }

    setError("Cadastro realizado. Verifique seu e-mail para confirmar a conta (se necessário).");
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Criar Conta</h1>
          <p className="text-gray-600 mt-2">Junte-se a nós para começar a comprar</p>
        </div>

        {import.meta.env.DEV && debugJson && (
          <div className="mt-6 p-4 bg-gray-100 border rounded overflow-auto max-h-64">
            <h3 className="font-medium mb-2">Debug (dev only)</h3>
            <pre className="text-xs whitespace-pre-wrap">{debugJson}</pre>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <Input
                type="text"
                placeholder="João Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <Input
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Senha
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <Input
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-6 text-lg"
            disabled={loading}
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Já tem conta?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
