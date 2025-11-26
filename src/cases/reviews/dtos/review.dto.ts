import type { CustomerDTO } from "@/cases/customers/dtos/customer.dto";
import type { ProductDTO } from "@/cases/products/dtos/product.dto";

export interface ReviewDTO {
    id: string;
    stars: number;
    description?: string;
    comment?: string;
    customer: CustomerDTO;
    product: ProductDTO;
    createdAt?: string;
}
