import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, AlertCircle } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugJson, setDebugJson] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email e senha são obrigatórios");
      return;
    }

    setLoading(true);
    const signInRes = await signIn(email, password);
    if (import.meta.env.DEV) setDebugJson(JSON.stringify(signInRes, null, 2));

    if (signInRes.error) {
      setError(signInRes.error);
      setLoading(false);
      return;
    }

    // Successful login
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Fazer Login</h1>
          <p className="text-gray-600 mt-2">Acesse sua conta para continuar comprando</p>
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

        <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Entrando..." : "Fazer Login"}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Não tem conta?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Criar uma agora
          </Link>
        </p>
      </div>
    </div>
  );
}
