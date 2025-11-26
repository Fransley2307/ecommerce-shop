import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  FavoritesContext,
  type FavoriteItem,
} from "@/contexts/favorites-context-definitions";

function initFavoritesFromStorage(userId?: string): FavoriteItem[] {
  if (!userId) return [];
  try {
    const saved = localStorage.getItem(`favorites_${userId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    // Ignore parse errors
  }
  return [];
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState(() =>
    initFavoritesFromStorage(user?.id)
  );

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user?.id]);

  const addToFavorites = useCallback((product: FavoriteItem) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromFavorites = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.some((p) => p.id === id);
  }, [favorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
