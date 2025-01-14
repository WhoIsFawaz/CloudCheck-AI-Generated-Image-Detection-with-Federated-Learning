"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = Cookies.get("token");
    const storedUserId = Cookies.get("userId");
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  const login = (newToken: string, newUserId: string) => {
    // Set cookies with secure flags
    Cookies.set("token", newToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: 7, // 7 days
    });
    Cookies.set("userId", newUserId, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: 7, // 7 days
    });

    // Update state
    setToken(newToken);
    setUserId(newUserId);

    // Force a hard navigation to ensure middleware runs
    window.location.href = "/dashboard";
  };

  const logout = () => {
    // Clear cookies
    Cookies.remove("token");
    Cookies.remove("userId");

    // Clear state
    setToken(null);
    setUserId(null);

    // Force a hard navigation to ensure middleware runs
    window.location.href = "/auth/login";
  };

  const value = {
    isAuthenticated: !!token,
    token,
    userId,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
