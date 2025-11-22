import { useState } from "react";
import { useCreateReview } from "../hooks/use-review";
import { Star } from "lucide-react";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";
import { useCurrentCustomer } from "@/cases/customers/hooks/use-customer";

export type RatingStarsProps = {
    product: ProductDTO
}

export function RatingStars({ product }: RatingStarsProps) {
    const [rating, setRating] = useState(0);
    const createReview = useCreateReview();
    const { customer } = useCurrentCustomer();

    function handleRate(value: number) {
        setRating(value);

        createReview.mutate({
            stars: value,
            product,
            customer: customer!
        });

    }

    return (
        <div className="flex gap-1 py-2">
            {[1, 2, 3, 4, 5].map(n => (
                <Star key={n}
                      onClick={() => handleRate(n)}
                      className={`w-6 h-6 cursor-pointer ${n <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-400"}`}/>
            ))}
        </div>
    );
}
