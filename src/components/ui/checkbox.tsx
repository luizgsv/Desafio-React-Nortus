'use client';
import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, checked, onChange, ...props }, ref) => {
    return (
      <label
        className={`
          flex items-center gap-2 cursor-pointer select-none
          text-sm text-muted-foreground hover:text-foreground transition-colors
        `}
      >
        <div
          className={`
            relative w-5 h-5 rounded-md border flex items-center justify-center
            transition-all duration-200
            ${checked ? 'bg-[#1876d2] border-[#1876d2]' : 'border-gray-400 bg-transparent'}
          `}
        >
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="
              absolute inset-0 opacity-0 cursor-pointer
              peer
            "
            {...props}
          />

          {/* Ícone de check */}
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 animate-scale-in"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>

        {label && <span>{label}</span>}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
