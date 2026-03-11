import { forwardRef } from 'react';

export const Input = forwardRef(({
  className = '',
  label,
  error,
  id,
  ...props
}, ref) => {
  const inputId = id || Math.random().toString(36).substring(2, 9);

  return (
    <div className="w-full space-y-2">
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className={`
          flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm 
          ring-offset-zinc-950 file:border-0 file:bg-transparent file:text-sm file:font-medium 
          placeholder:text-zinc-500 
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:border-transparent
          disabled:cursor-not-allowed disabled:opacity-50
          transition-colors
          ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm font-medium text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
