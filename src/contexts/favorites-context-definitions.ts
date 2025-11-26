import { createContext } from "react";

export interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (product: FavoriteItem) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);
