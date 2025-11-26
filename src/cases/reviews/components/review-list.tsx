import { Star } from "lucide-react";
import type { ReviewDTO } from "../dtos/review.dto";

interface ReviewListProps {
  reviews: ReviewDTO[];
  loading?: boolean;
}

export function ReviewList({ reviews, loading }: ReviewListProps) {
  if (loading) {
    return <div className="text-center py-8">Carregando avaliações...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        Nenhuma avaliação ainda. Seja o primeiro a avaliar!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.stars
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold">{review.stars}/5</span>
          </div>

          {/* Comment */}
          <p className="text-gray-700">{review.comment || review.description}</p>

          {/* Author and Date */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t text-sm text-gray-600">
            <span>
              {review.customer?.name || "Usuário"}
            </span>
            {review.createdAt && (
              <span>
                {new Date(review.createdAt).toLocaleDateString("pt-BR")}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
