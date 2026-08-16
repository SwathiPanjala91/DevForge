"use client";

import React from "react";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "./ToastContext";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
