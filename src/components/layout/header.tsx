import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut, Heart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { useSearch } from "@/contexts/search-context";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { cartCount } = useCart();
  const { query, setQuery } = useSearch();
  const { user, isAuthenticated, signOut } = useAuth();

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 gap-4 px-4">
        <Link to="/" className="text-2xl font-bold shrink-0">
          Casa Das Tintas
        </Link>

        <div className="flex-1 px-4">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full h-11 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Carrinho */}
          <Link to={isAuthenticated ? "/cart" : "/login"} className="relative">
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Menu de usuário */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="cursor-pointer">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Meus Pedidos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites" className="cursor-pointer">
                    <Heart className="w-4 h-4 mr-2" />
                    Favoritos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login" className="hidden md:block">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup" className="hidden md:block">
                <Button size="sm">
                  Criar Conta
                </Button>
              </Link>
              <Link to="/login" className="md:hidden">
                <Button variant="outline" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
