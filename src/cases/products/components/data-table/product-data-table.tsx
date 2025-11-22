import { DataTable } from "@/components/ui/data-table";
import { productColumns } from "./product-columns";
import { useFavoriteProducts } from "@/cases/favorites/hooks/use-favorite";

type CustomerDataTableProps = {
    searchTerm: string;
}

export function ProductDataTable({ searchTerm }: CustomerDataTableProps) {
    const { favoriteProducts, isLoading } = useFavoriteProducts();

    return (
        <div>
            { isLoading ? (
                <p>Carregando...</p>
            ) : (
                <DataTable columns={productColumns} data={favoriteProducts!.filter ((p) => p.name.toLowerCase().includes(searchTerm))} />
            )}
        </div>
    );
}