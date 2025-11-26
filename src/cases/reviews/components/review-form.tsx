import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star, AlertCircle } from "lucide-react";
import { ReviewService } from "../services/review.service";

interface ReviewFormProps {
  productId: string;
  customerId: string;
  onReviewSubmitted?: () => void;
}

interface ReviewPayload {
  stars: number;
  comment: string;
  description: string;
  customer: { id: string };
  product: { id: string };
}

export function ReviewForm({ productId, customerId, onReviewSubmitted }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Por favor, selecione uma classificação");
      return;
    }

    if (!comment.trim()) {
      setError("Por favor, escreva um comentário");
      return;
    }

    setLoading(true);

    try {
      const payload: ReviewPayload = {
        stars: rating,
        comment,
        description: comment,
        customer: { id: customerId },
        product: { id: productId },
      };
      
      await ReviewService.create(payload as Parameters<typeof ReviewService.create>[0]);

      setSuccess(true);
      setRating(0);
      setComment("");

      setTimeout(() => {
        setSuccess(false);
        onReviewSubmitted?.();
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao enviar avaliação"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
        ✓ Obrigado pela sua avaliação!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Avalie este produto</h3>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-2 text-sm text-red-800">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Star Rating */}
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoveredRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      {rating > 0 && (
        <p className="text-sm text-gray-600">
          {rating === 1 && "Péssimo"}
          {rating === 2 && "Ruim"}
          {rating === 3 && "Normal"}
          {rating === 4 && "Bom"}
          {rating === 5 && "Excelente"}
        </p>
      )}

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seu comentário
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Conte sua experiência com o produto..."
          className="w-full h-24 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading || !rating}
      >
        {loading ? "Enviando..." : "Enviar Avaliação"}
      </Button>
    </form>
  );
}
