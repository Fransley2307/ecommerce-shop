"use client";

import { useCart } from "@/contexts/cart-context";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Meu Carrinho</h1>

      {cart.length === 0 && (
        <p>Seu carrinho está vazio.</p>
      )}

      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="border p-4 rounded">
            <h2 className="font-semibold">{item.name}</h2>
            <p>Qtd: {item.quantity}</p>
            <p>Preço: R$ {item.price.toFixed(2)}</p>

            <button
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => removeFromCart(item.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
