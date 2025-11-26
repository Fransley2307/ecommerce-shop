import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/hooks/use-auth";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormattedNumber, IntlProvider } from "react-intl";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { OrderService } from "../services/order.service";

interface OrderFormData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { customer } = useCurrentCustomer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState<OrderFormData>({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  if (cart.length === 0 && !success) {
    return (
      <div className="container mx-auto py-20">
        <div className="text-center">
          <p className="text-gray-600 mb-6">Seu carrinho está vazio</p>
          <Button onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar para produtos
          </Button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate form
      if (!formData.address || !formData.city || !formData.state || !formData.zipCode || !formData.phone) {
        throw new Error("Todos os campos são obrigatórios");
      }

      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      // Create order items
      const orderItems = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.price,
      }));

      // Create order - backend will auto-create customer if needed
      const order = {
        userId: user.id,
        customerId: customer?.id, // Optional: use existing customer if available
        name: user.user_metadata?.full_name || user.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        phone: formData.phone,
        total: cartTotal,
        shipping: 0,
        items: orderItems,
      };

      // @ts-expect-error - Backend expects different DTO structure
      await OrderService.create(order);

      // Clear cart and show success
      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar pedido");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto py-20">
        <div className="text-center max-w-md mx-auto">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pedido Realizado!</h1>
          <p className="text-gray-600 mb-6">
            Seu pedido foi criado com sucesso. Você receberá atualizações por email.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => navigate("/orders")}
              className="w-full"
            >
              Ver Meus Pedidos
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full"
            >
              Continuar Comprando
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Button
        variant="ghost"
        onClick={() => navigate("/cart")}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar ao carrinho
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço
              </label>
              <Input
                type="text"
                name="address"
                placeholder="Rua, número, complemento"
                value={formData.address}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade
                </label>
                <Input
                  type="text"
                  name="city"
                  placeholder="São Paulo"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <Input
                  type="text"
                  name="state"
                  placeholder="SP"
                  value={formData.state}
                  onChange={handleChange}
                  disabled={loading}
                  maxLength={2}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CEP
                </label>
                <Input
                  type="text"
                  name="zipCode"
                  placeholder="12345-678"
                  value={formData.zipCode}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="(11) 99999-9999"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg mt-6"
              disabled={loading}
            >
              {loading ? "Processando..." : "Finalizar Pedido"}
            </Button>
          </form>
        </div>

        {/* Resumo */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

            <div className="space-y-3 mb-6 pb-6 border-b">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity}x{" "}
                    <IntlProvider locale="pt-BR">
                      <FormattedNumber value={item.price} style="currency" currency="BRL" />
                    </IntlProvider>
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  <IntlProvider locale="pt-BR">
                    <FormattedNumber value={cartTotal} style="currency" currency="BRL" />
                  </IntlProvider>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="font-semibold text-green-600">Grátis</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-blue-600">
                <IntlProvider locale="pt-BR">
                  <FormattedNumber value={cartTotal} style="currency" currency="BRL" />
                </IntlProvider>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
