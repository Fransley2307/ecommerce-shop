import { useParams } from "react-router-dom";
import { useProduct } from "@/cases/products/hooks/use-product";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { FormattedNumber, IntlProvider } from "react-intl";

export function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const { data: product, isLoading } = useProduct(productId ?? "");
  const cart = useCart(); 

  if (!productId) {
    return <div className="container mx-auto py-10 text-center">Produto inválido</div>;
  }

  if (isLoading) {
    return <div className="container mx-auto py-10 text-center">Carregando...</div>;
  }

  if (!product) {
    return <div className="container mx-auto py-10 text-center">Produto não encontrado</div>;
  }

  function handleAddToCart() {
    if (!product || !product.id) return;
    cart.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: (product as any).image ?? "",
      quantity: 1,
    });
  }

  return (
    <div className="container mx-auto py-10 flex flex-col md:flex-row gap-10">
      <div className="md:w-1/2">
        <img src={(product as any).image} alt={product.name} className="w-full rounded-lg" />
      </div>

      <div className="md:w-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-700">{product.description}</p>

        <div className="text-xl font-semibold">
          <IntlProvider locale="pt-BR">
            <FormattedNumber value={product.price} style="currency" currency="BRL" />
          </IntlProvider>
        </div>

        <Button onClick={handleAddToCart} className="mt-4 w-40">
          Adicionar ao Carrinho
        </Button>
      </div>
    </div>
  );
}