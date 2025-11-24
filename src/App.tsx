import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/cart-context";
import { SearchProvider } from "./contexts/search-context"; // <-- adicionado
import { ProductListPage } from "./pages/product-list.page";
import { ProductDetailPage } from "./pages/product-detail.page"; // caso queira detalhe
import { CartPage } from "./pages/cart.page";
import { Header } from "./components/layout/header";

function App() {
  return (
    <CartProvider>
      <SearchProvider>
        <>
          <Header />

          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} /> {/* detalhe */}
          </Routes>
        </>
      </SearchProvider>
    </CartProvider>
  );
}

export default App;
