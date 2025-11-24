import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useSearch } from "@/contexts/search-context";

export function Header() {
  
  const { cartCount } = useCart();
  const { query, setQuery } = useSearch();

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 gap-4">
        <Link to="/" className="text-2xl font-bold">
          Carne Shop
        </Link>

        <div className="flex-1 px-10">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full h-11 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>

            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>

          <Link to="/login">
            <Button variant="outline" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
