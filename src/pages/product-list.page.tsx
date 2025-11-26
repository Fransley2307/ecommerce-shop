import { CategoryMenu } from "@/cases/categories/components/category-menu";
import { ProductCard } from "@/cases/products/components/product-card";
import { useProducts } from "@/cases/products/hooks/use-product";
import { useSearch } from "@/contexts/search-context";
import { useState } from "react";


export function ProductListPage() {
  const { data: products, isLoading } = useProducts();
  const { query } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = products?.filter(
    (p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.description?.toLowerCase() ?? "").includes(query.toLowerCase());
      
      const matchesCategory = !selectedCategory || p.category?.id === selectedCategory;
      
      return matchesSearch && matchesCategory;
    }
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 text-center">
        Carregando produtos...
      </div>
    );
  }

  return (
    <>
      <CategoryMenu onCategorySelect={setSelectedCategory} />

      <section className="container mx-auto py-10 px-4">
        {filteredProducts && filteredProducts.length > 0 ? (
          <>
            <p className="text-sm text-gray-600 mb-6">
              {filteredProducts.length} produto(s) encontrado(s)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600 text-lg">
              Nenhum produto encontrado.
            </p>
            {selectedCategory && (
              <p className="text-gray-500 text-sm mt-2">
                Tente selecionar outra categoria ou fazer uma busca diferente.
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
}
