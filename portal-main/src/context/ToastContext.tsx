"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertTriangle, Info, XCircle, Award } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info" | "achievement";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              className="pointer-events-auto flex items-center justify-between p-4 rounded-xl border border-white/10 backdrop-blur-xl bg-black/60 shadow-2xl overflow-hidden group"
            >
              <div className="flex items-center gap-3">
                {toast.type === "success" && <CheckCircle className="text-emerald-500 w-5 h-5 shrink-0" />}
                {toast.type === "error" && <XCircle className="text-rose-500 w-5 h-5 shrink-0" />}
                {toast.type === "warning" && <AlertTriangle className="text-amber-500 w-5 h-5 shrink-0" />}
                {toast.type === "info" && <Info className="text-blue-500 w-5 h-5 shrink-0" />}
                {toast.type === "achievement" && <Award className="text-purple-500 w-5 h-5 shrink-0" />}
                <p className="text-sm font-medium text-white">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-0 left-0 h-[2px] bg-white/20 w-full">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  className={`h-full ${
                    toast.type === "success" ? "bg-emerald-500" :
                    toast.type === "error" ? "bg-rose-500" :
                    toast.type === "warning" ? "bg-amber-500" : 
                    toast.type === "achievement" ? "bg-purple-500" : "bg-blue-500"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
