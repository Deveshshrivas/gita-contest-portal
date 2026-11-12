import React from 'react';

const VARIANTS = {
  primary: 'bg-vedic-primary hover:bg-vedic-dark text-white shadow-xs focus:ring-vedic-teal',
  gold: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-xs focus:ring-amber-400',
  secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 focus:ring-slate-300',
  outline: 'bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-300 focus:ring-slate-400',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-300',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs focus:ring-rose-400',
  purple: 'bg-purple-600 hover:bg-purple-700 text-white shadow-xs focus:ring-purple-400',
};

const SIZES = {
  xs: 'px-2.5 py-1 text-xs rounded-md',
  sm: 'px-3 py-1.5 text-xs font-semibold rounded-lg',
  md: 'px-4 py-2 text-sm font-semibold rounded-xl',
  lg: 'px-6 py-3 text-base font-bold rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon: Icon,
  type = 'button',
  onClick,
  ...props
}) {
  const variantClass = VARIANTS[variant] || VARIANTS.primary;
  const sizeClass = SIZES[size] || SIZES.md;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 transition-all font-sans select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="shrink-0" />}
      <span>{children}</span>
    </button>
  );
}
