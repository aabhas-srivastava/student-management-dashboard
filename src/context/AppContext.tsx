"use client";

import { createContext, useContext, ReactNode } from "react";

interface AppContextType {
  adminName: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <AppContext.Provider value={{ adminName: "Admin" }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}