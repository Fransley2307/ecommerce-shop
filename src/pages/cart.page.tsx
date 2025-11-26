import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

export function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-20">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Seu carrinho está vazio</h1>
          <p className="text-gray-600 mb-6">Adicione alguns produtos para começar!</p>
          <Link to="/">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Continuar comprando
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Continuar comprando
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Produtos */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Meu Carrinho</h1>
          <p className="text-sm text-gray-600 mb-4">
            {cart.length} item(s) no carrinho
          </p>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {/* Imagem */}
                <div className="w-24 h-24 bg-gray-100 rounded shrink-0">
                  <img
                    src={item.image || undefined}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Detalhes */}
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    <IntlProvider locale="pt-BR">
                      <FormattedNumber value={item.price} style="currency" currency="BRL" />
                    </IntlProvider>
                    {' '}cada
                  </p>

                  {/* Controle de quantidade */}
                  <div className="flex items-center gap-2 mt-3 border rounded w-fit">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Preço e remover */}
                <div className="flex flex-col items-end justify-between">
                  <p className="font-bold text-lg text-blue-600">
                    <IntlProvider locale="pt-BR">
                      <FormattedNumber value={item.price * item.quantity} style="currency" currency="BRL" />
                    </IntlProvider>
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Remover do carrinho"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="destructive"
            className="mt-6 w-full"
            onClick={() => {
              if (window.confirm("Tem certeza que deseja limpar o carrinho?")) {
                clearCart();
              }
            }}
          >
            Limpar Carrinho
          </Button>
        </div>

        {/* Resumo */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Resumo da Compra</h2>

            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  <IntlProvider locale="pt-BR">
                    <FormattedNumber value={total} style="currency" currency="BRL" />
                  </IntlProvider>
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="font-semibold text-green-600">Grátis</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span className="text-blue-600">
                <IntlProvider locale="pt-BR">
                  <FormattedNumber value={total} style="currency" currency="BRL" />
                </IntlProvider>
              </span>
            </div>

            <Button className="w-full mb-3 py-6" asChild>
              <Link to="/checkout">
                Prosseguir para Checkout
              </Link>
            </Button>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/">
                Continuar Comprando
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
