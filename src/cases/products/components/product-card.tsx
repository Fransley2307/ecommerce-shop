import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from 'react-intl';
import { useCart } from "@/contexts/cart-context";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
    product: ProductDTO
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    function handleAddToCart() {
        addToCart({
            id: product.id ?? "",
            name: product.name,
            price: product.price,
            image: (product as any).image ?? "",
            quantity: 1,
        });
    }

    return (
        <Card>
            <CardHeader>
                <Link to={`/product/${product.id}`}>
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                            Sem imagem
                        </div>
                    )}
                </Link>
            </CardHeader>

            <CardContent>
                <Link to={`/product/${product.id}`}>
                    <h4 className="font-semibold text-lg">{product.name}</h4>
                </Link>

                <div className="w-full flex flex-col mt-2 gap-1">
                    <p>
                        <IntlProvider locale="pt-BR">
                            <FormattedNumber value={product.price} style="currency" currency="BRL"/> Kg
                        </IntlProvider>
                    </p>
                    <p>
                        <IntlProvider locale="pt-BR">
                            <FormattedNumber value={product.price} style="currency" currency="BRL"/> em 10x de 
                            <FormattedNumber value={product.price / 10} style="currency" currency="BRL"/>
                        </IntlProvider>
                    </p>
                    <p>
                        ou
                        <IntlProvider locale="pt-BR">
                            <FormattedNumber value={product.price * 0.9} style="currency" currency="BRL"/>
                        </IntlProvider>
                        no PIX
                    </p>
                </div>

                <Button
                    className="mt-4 w-full"
                    onClick={handleAddToCart}
                >
                    Adicionar ao carrinho
                </Button>
            </CardContent>
        </Card>
    )
}
