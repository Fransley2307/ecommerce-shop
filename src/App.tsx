import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/cart-context";
import { AuthProvider } from "./contexts/auth-context";
import { SearchProvider } from "./contexts/search-context";
import { FavoritesProvider } from "./contexts/favorites-context";
import { ProductListPage } from "./pages/product-list.page";
import { ProductDetailPage } from "./pages/product-detail.page";
import { CartPage } from "./pages/cart.page";
import { LoginPage } from "./cases/auth/pages/login.page";
import { SignUpPage } from "./cases/auth/pages/signup.page";
import { CheckoutPage } from "./cases/orders/pages/checkout.page";
import { OrdersPage } from "./cases/orders/pages/orders.page";
import { FavoritesPage } from "./cases/favorites/pages/favorites.page";
import { ProtectedRoute } from "./cases/auth/guards/protected-route";
import { PublicRoute } from "./cases/auth/guards/public-route";
import { Header } from "./components/layout/header";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <FavoritesProvider>
            <>
              <Header />

              <Routes>
                <Route path="/" element={<ProductListPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />

                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <SignUpPage />
                    </PublicRoute>
                  }
                />

                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <FavoritesPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </>
          </FavoritesProvider>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
