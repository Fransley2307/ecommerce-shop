import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "@/cases/products/hooks/use-product";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { FormattedNumber, IntlProvider } from "react-intl";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { ReviewList } from "@/cases/reviews/components/review-list";
import { ReviewForm } from "@/cases/reviews/components/review-form";
import { ReviewService } from "@/cases/reviews/services/review.service";
import type { ReviewDTO } from "@/cases/reviews/dtos/review.dto";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop";

export function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const { data: product, isLoading } = useProduct(productId ?? "");
  const cart = useCart();

  // Load reviews
  useEffect(() => {
    if (productId) {
      loadReviews();
    }
  }, [productId]);

  const loadReviews = async () => {
    try {
      setReviewsLoading(true);
      const data = await ReviewService.listByProduct(productId ?? "");
      setReviews(data || []);
    } catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

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
    for (let i = 0; i < quantity; i++) {
      cart.addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: (product as any).image ?? PLACEHOLDER_IMAGE,
        quantity: 1,
      });
    }
    setQuantity(1);
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="container mx-auto py-10">
      <Button
        variant="ghost"
        onClick={() => navigate("/")}
        className="mb-6 gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para produtos
      </Button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Imagem e info básica */}
        <div className="md:w-1/2">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={(product as any).image ?? PLACEHOLDER_IMAGE} 
              alt={product.name} 
              className="w-full h-96 object-cover"
            />
          </div>
          {product.brand && (
            <p className="text-sm text-gray-600 mt-4">
              Marca: <span className="font-semibold">{product.brand.name}</span>
            </p>
          )}
          {product.category && (
            <p className="text-sm text-gray-600 mt-1">
              Categoria: <span className="font-semibold">{product.category.name}</span>
            </p>
          )}
          {reviews.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Avaliação dos clientes</p>
              <p className="text-2xl font-bold text-blue-600">
                {avgRating} ⭐ ({reviews.length} avaliações)
              </p>
            </div>
          )}
        </div>

        {/* Informações e compra */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-700 text-lg">{product.description}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Preço</p>
            <p className="text-3xl font-bold text-blue-600">
              <IntlProvider locale="pt-BR">
                <FormattedNumber value={product.price} style="currency" currency="BRL" />
              </IntlProvider>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              ou em 10x de{' '}
              <IntlProvider locale="pt-BR">
                <FormattedNumber value={product.price / 10} style="currency" currency="BRL" />
              </IntlProvider>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <span className="px-4 py-2 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-600">
              Total: <IntlProvider locale="pt-BR">
                <FormattedNumber value={product.price * quantity} style="currency" currency="BRL" />
              </IntlProvider>
            </span>
          </div>

          <Button 
            onClick={handleAddToCart} 
            className="w-full py-6 text-lg"
          >
            Adicionar ao Carrinho
          </Button>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Informações do Produto</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>✓ Garantia do fabricante</li>
              <li>✓ Entrega em todo o Brasil</li>
              <li>✓ Compra segura</li>
              <li>✓ Suporte ao cliente 24/7</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16 grid md:grid-cols-2 gap-10">
        {/* Review Form */}
        <div>
          {isAuthenticated && user ? (
            <ReviewForm
              productId={productId}
              customerId={user.id}
              onReviewSubmitted={loadReviews}
            />
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800 mb-3">
                Faça login para avaliar este produto
              </p>
              <Button
                onClick={() => navigate("/login")}
                variant="outline"
                size="sm"
              >
                Fazer Login
              </Button>
            </div>
          )}
        </div>

        {/* Reviews List */}
        <div>
          <h3 className="text-xl font-bold mb-4">
            Avaliações dos Clientes ({reviews.length})
          </h3>
          <ReviewList reviews={reviews} loading={reviewsLoading} />
        </div>
      </div>
    </div>
  );
}