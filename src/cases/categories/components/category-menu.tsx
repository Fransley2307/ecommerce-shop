import { Button } from "@/components/ui/button"
import { useCategories } from "../hooks/use-category"
import { useEffect, useState } from "react";
import type { CategoryDTO } from "../dtos/category.dto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
// import { useProducts } from "@/cases/products/hooks/use-product";

interface CategoryMenuProps {
  onCategorySelect?: (categoryId: string | null) => void;
}

export function CategoryMenu({ onCategorySelect }: CategoryMenuProps) {

  const { data: categories } = useCategories();
  const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
  const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (categories) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibleItems(categories.slice(0, 5));
      setHiddenItems(categories.slice(5));
    }
  }, [categories]);

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    onCategorySelect?.(categoryId);
  };

  return (
    <nav  className="w-full py-4 flex items-center justify-between bg-gray-50">
      <div className="flex flex-col pl-4 md:pl-16">
        <h5 className="font-medium text-2xl text-gray-900">Nossos Produtos</h5>
        <p className="text-sm text-gray-500">Novos produtos todos os dias</p>
      </div>
      <div className="flex items-center justify-end gap-2 pr-4 md:pr-16 flex-wrap">
        <Button 
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => handleSelectCategory(null)}
        >
          Todos 
        </Button>
        {visibleItems.map((category) => (
          <Button 
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => handleSelectCategory(category.id ?? null)}
          >
            {category.name}
          </Button>
        ))}
        {hiddenItems.length > 0 && (
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={hiddenItems.some(c => c.id === selectedCategory) ? "default" : "outline"}>
              Mais 
              <ChevronDown className="w-4 h-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {hiddenItems.map((category) => (
               <DropdownMenuItem
               key={category.id}
               onClick={() => handleSelectCategory(category.id ?? null)}
               >
                {category.name}
                </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        )}
      </div>
    </nav>
  );
}