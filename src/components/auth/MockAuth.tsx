"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Mock Auth0 User type
interface User {
  name?: string;
  email?: string;
  picture?: string;
  sub?: string;
}

// Mock Auth0 Context
interface Auth0ContextType {
  user?: User;
  error?: Error;
  isLoading: boolean;
}

const Auth0Context = createContext<Auth0ContextType>({
  user: undefined,
  error: undefined,
  isLoading: false
});

// Mock UserProvider
export function UserProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User | undefined>(undefined);
  const [isLoading] = useState(false);
  const [error] = useState<Error | undefined>(undefined);

  return (
    <Auth0Context.Provider value={{ user, error, isLoading }}>
      {children}
    </Auth0Context.Provider>
  );
}

// Mock useUser hook
export function useUser(): Auth0ContextType {
  return useContext(Auth0Context);
}