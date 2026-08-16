"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-cyan-300/90">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-white/50 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full glass-input rounded-xl px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none transition-all duration-200 ${
              leftIcon ? "pl-10" : ""
            } ${rightIcon ? "pr-10" : ""} ${
              error ? "border-rose-500 focus:border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]" : ""
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 text-white/50 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-rose-400 mt-0.5 font-medium">{error}</span>}
        {helperText && !error && <span className="text-xs text-white/50">{helperText}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold uppercase tracking-wider text-cyan-300/90">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full glass-input rounded-xl px-4 py-3 text-sm placeholder:text-gray-500 focus:outline-none transition-all duration-200 min-h-[100px] resize-y ${
            error ? "border-rose-500 focus:border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)]" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-rose-400 mt-0.5 font-medium">{error}</span>}
        {helperText && !error && <span className="text-xs text-white/50">{helperText}</span>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
