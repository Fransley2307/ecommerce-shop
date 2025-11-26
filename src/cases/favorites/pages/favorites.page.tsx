import { useFavorites } from "@/hooks/use-favorites";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Heart, ArrowLeft } from "lucide-react";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop";

export function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto py-20">
        <div className="text-center">
          <Heart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sem Favoritos</h1>
          <p className="text-gray-600 mb-6">
            Adicione produtos aos seus favoritos para salvá-los!
          </p>
          <Link to="/">
            <Button className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Ver Produtos
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
            Voltar para produtos
          </Button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Meus Favoritos</h1>
      <p className="text-gray-600 mb-6">{favorites.length} item(s) nos favoritos</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
          >
            {/* Imagem */}
            <div className="relative bg-gray-100 h-48">
              <img
                src={item.image ?? PLACEHOLDER_IMAGE}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeFromFavorites(item.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-red-50 transition-colors"
                title="Remover dos favoritos"
              >
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              </button>
            </div>

            {/* Info */}
            <div className="p-4 flex-1 flex flex-col gap-3">
              <div>
                <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  <IntlProvider locale="pt-BR">
                    <FormattedNumber value={item.price} style="currency" currency="BRL" />
                  </IntlProvider>
                </p>
              </div>

              <Link to={`/product/${item.id}`} className="mt-auto">
                <Button variant="outline" className="w-full">
                  Ver Detalhes
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
