import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useCart } from "../context/cart-context";
import { toast } from "react-toastify";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";
import { useCreateOrder } from "@/cases/orders/hooks/use-order";
import { useCreateOrderItem } from "@/cases/orders/hooks/use-order-item";
import { useState } from "react";

export function Cart() {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const total = cart.reduce((sum, p) => sum + Number(p.price) * p.quantity, 0);

  const { customer } = useCurrentCustomer();
  const createOrder = useCreateOrder();
  const createOrderItem = useCreateOrderItem();

  const [isProcessing, setIsProcessing] = useState(false);

  const handleClearCart = async () => {
    clearCart();
    toast.info("Carrinho limpo com sucesso!");
  }

  const handleFinishOrder = async () => {
    try {
      setIsProcessing(true);

      const newOrder = await createOrder.mutateAsync({
        shipping: 0,
        status: "NEW",
        total,
        customer: customer!.id!,
      });

      await Promise.all(
        cart.map((p) =>
          createOrderItem.mutateAsync({
            quantity: p.quantity,
            value: Number(p.price),
            order: newOrder.id!,
            product: p.id!,
          })
        )
      );

      toast.success("Compra finalizada com sucesso!");
      clearCart();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao finalizar o pedido.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Meu Carrinho</h1>

      {
        cart.length === 0 ? 
            (
                <p className="text-gray-500">Seu carrinho está vazio.</p>
            ) 
        : 
            (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        {
                            cart.map((product) => (
                                <Card key={product.id} 
                                      className="flex flex-col justify-between h-full">
                                    <CardHeader>
                                        <h2 className="text-lg font-semibold">{product.name}</h2>
                                    </CardHeader>

                                    <CardContent className="flex flex-col justify-between h-full">
                                        {
                                            product.description ? 
                                                (<p className="text-sm text-gray-600 mb-2 whitespace-pre-line wrap-break-words">{product.description}</p>) 
                                            : 
                                                (<div className="h-full" />)
                                        }

                                        <div className="flex items-center justify-between mt-2">
                                            <span className="font-bold text-green-600 text-lg">
                                                R$ {Number(product.price).toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-center gap-3 mt-4">
                                            <Button variant="outline"
                                                    size="sm"
                                                    onClick={() => decreaseQuantity(product.id!)}
                                                    disabled={product.quantity <= 1}>
                                                –
                                            </Button>

                                            <span className="font-medium">{product.quantity}</span>

                                            <Button variant="outline"
                                                    size="sm"
                                                    onClick={() => increaseQuantity(product.id!)}>
                                                +
                                            </Button>
                                        </div>

                                        <p className="mt-4 text-center text-gray-500 text-sm">
                                            Subtotal:{" "}
                                            <span className="font-semibold text-green-600">
                                                R$ {(Number(product.price) * product.quantity).toFixed(2)}
                                            </span>
                                        </p>
                                    </CardContent>

                                    <CardFooter className="mt-auto">
                                        <Button variant="destructive"
                                                className="w-full cursor-pointer"
                                                onClick={() => {
                                                removeFromCart(product.id!);
                                                }}>
                                            Remover
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-4">
                        <h2 className="text-xl font-semibold">
                            Total: <span className="text-green-600">R$ {total.toFixed(2)}</span>
                        </h2>

                        <div className="flex gap-3">
                            <Button variant="secondary"
                                    className="cursor-pointer"
                                    onClick={handleClearCart}
                                    disabled={isProcessing}>
                                Limpar carrinho
                            </Button>

                            <Button onClick={handleFinishOrder}
                                    className="cursor-pointer"
                                    disabled={isProcessing}>
                                {isProcessing ? "Processando..." : "Finalizar compra"}
                            </Button>
                        </div>
                    </div>
                </>
            )
      }
    </div>
  );
}
