import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

export interface SignUpResult {
  error?: string;
  data?: Record<string, unknown>;
}

export interface SignInResult {
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<SignUpResult>;
  signIn: (email: string, password: string) => Promise<SignInResult>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
