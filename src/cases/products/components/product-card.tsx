import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ProductDTO } from "../dtos/product.dto";
import { FormattedNumber, IntlProvider } from 'react-intl';
import { useCart } from "@/contexts/cart-context";
import { useFavorites } from "@/hooks/use-favorites";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop";

type ProductCardProps = {
    product: ProductDTO
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const favorite = isFavorite(product.id ?? "");

    function handleAddToCart() {
        addToCart({
            id: product.id ?? "",
            name: product.name,
            price: product.price,
            image: product.image ?? PLACEHOLDER_IMAGE,
            quantity: 1,
        });
    }

    function handleToggleFavorite() {
        if (favorite) {
            removeFromFavorites(product.id ?? "");
        } else {
            addToFavorites({
                id: product.id ?? "",
                name: product.name,
                price: product.price,
                image: product.image ?? PLACEHOLDER_IMAGE,
            });
        }
    }

    return (
        <Card className="hover:shadow-lg transition-shadow overflow-hidden">
            <CardHeader className="p-0 relative">
                <Link to={`/product/${product.id}`} className="block overflow-hidden">
                    <img
                        src={product.image ?? PLACEHOLDER_IMAGE}
                        alt={product.name}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform"
                    />
                </Link>
                <button
                    onClick={handleToggleFavorite}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                    title={favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                    <Heart
                        className={`w-5 h-5 ${
                            favorite
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400 hover:text-red-500"
                        }`}
                    />
                </button>
            </CardHeader>

            <CardContent className="p-4">
                <Link to={`/product/${product.id}`}>
                    <h4 className="font-semibold text-lg line-clamp-2 hover:text-blue-600">
                        {product.name}
                    </h4>
                </Link>

                {product.category && (
                    <p className="text-xs text-gray-500 mt-1">
                        {product.category.name}
                    </p>
                )}

                <div className="w-full flex flex-col mt-3 gap-2">
                    <p className="text-lg font-bold text-blue-600">
                        <IntlProvider locale="pt-BR">
                            <FormattedNumber value={product.price} style="currency" currency="BRL"/>
                        </IntlProvider>
                    </p>
                    <p className="text-xs text-gray-600">
                        ou em 10x de{' '}
                        <IntlProvider locale="pt-BR">
                            <FormattedNumber value={product.price / 10} style="currency" currency="BRL"/>
                        </IntlProvider>
                    </p>
                </div>

                <Button
                    className="mt-4 w-full gap-2"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart className="w-4 h-4"/>
                    Adicionar
                </Button>
            </CardContent>
        </Card>
    )
}
