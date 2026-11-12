import React from 'react';

const VARIANTS = {
  default: 'bg-slate-100 text-slate-800 border-slate-200',
  primary: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  secondary: 'bg-teal-50 text-teal-800 border-teal-200',
  warning: 'bg-amber-50 text-amber-800 border-amber-200',
  danger: 'bg-rose-50 text-rose-800 border-rose-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
  purple: 'bg-purple-50 text-purple-800 border-purple-200',
  gold: 'bg-amber-100 text-amber-900 border-amber-300 font-bold',
};

export default function Badge({ children, variant = 'default', className = '', ...props }) {
  const baseClass = VARIANTS[variant] || VARIANTS.default;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${baseClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
