import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 focus-visible:ring-zinc-500',
  outline: 'border border-zinc-700 bg-transparent hover:bg-zinc-800 text-white focus-visible:ring-zinc-500',
  ghost: 'bg-transparent hover:bg-zinc-800 text-white focus-visible:ring-zinc-500',
  danger: 'bg-red-600/10 text-red-500 hover:bg-red-600/20 focus-visible:ring-red-500',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 py-2',
  lg: 'h-12 px-8 text-lg',
  icon: 'h-10 w-10',
};

export const Button = forwardRef(({ 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  disabled, 
  children, 
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center rounded-md font-medium transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
        disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';
