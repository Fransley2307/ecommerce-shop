import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";

export function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Seu carrinho está vazio 😢</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">
                  Quantidade: {item.quantity}
                </p>
                <p className="text-gray-800 font-medium">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <Button variant="destructive" onClick={() => removeFromCart(item.id)}>
                Remover
              </Button>
            </div>
          ))}

          <div className="mt-6 text-xl font-bold">
            Total: R$ {total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}
