"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"

  useEffect(() => {
    const savedUser = localStorage.getItem("njyot-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("njyot-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("njyot-user");
    }
  }, [user]);

  const login = (email, password) => {
    // Simulated login - replace with real API call in production
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const userData = {
            id: Date.now(),
            name: email.split("@")[0],
            email,
            createdAt: new Date().toISOString(),
          };
          setUser(userData);
          setIsAuthOpen(false);
          resolve(userData);
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 800);
    });
  };

  const signup = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password.length >= 6) {
          const userData = {
            id: Date.now(),
            name,
            email,
            createdAt: new Date().toISOString(),
          };
          setUser(userData);
          setIsAuthOpen(false);
          resolve(userData);
        } else {
          reject(new Error("Please fill all fields correctly"));
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("njyot-user");
  };

  const openAuth = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthOpen,
        authMode,
        openAuth,
        closeAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
