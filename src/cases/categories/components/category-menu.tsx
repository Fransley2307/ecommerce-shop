import { useState } from "react";
import { useCategories } from "../hooks/use-category";
import { useEffectt } from "react";
import type { CategoryDTO } from "../dtos/category.dto";

import{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";







export function CategoryMenu() {

     const {data: categories, isLoading} = useCategories();

    //Controla o agrupamento para exibir as categorias
    const [visibleItems, setVisibleItems] = useState<CategoryDTO[]>([]);
    const [hiddenItems, setHiddenItems] = useState<CategoryDTO[]>([]);

    useEffectt(() => {
        if(categories) {
            setVisibleItems(categories.slice(0,5));
            setHiddenItems(categories.slice(5));
        }
    },[categories])

    return (
        <nav className="w-full py-4 flex items-center justify-between">
            <div className="flex flex-col">
                <h5 className="font-medium text-2xl text-gray-900">Nossos Produtos</h5>
                <p className="text-sm text-gray-500">Novos produtos todos os dias</p>
            </div>

            <div className="flex items-center justify-end gap-2">
                <Button variant="ghost">
                    Todos
                </Button>
                {visibleItems.map((category) => (
                    <button
                        key={category.id}
                        variant="ghost"
                    >
                        {category.name}

                    </button>    
                ))}

                {hiddenItems.Length > 0 && (
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            Mais
                            <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {hiddenItems.map((category) => (
                            <DropdownMenuItem
                                key={category.id}
                            >
                                {category.name}
                            </DropdownMenuItem>                    
                        ))}
                    </DropdownMenuContent>
                    </DropdownMenu>
                )} 
            </div>
        </nav>
    )
}