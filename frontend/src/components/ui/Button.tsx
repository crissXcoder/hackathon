import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background';

    const variantClasses = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      destructive: 'bg-error text-white hover:bg-error/90',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    };

    const sizeClasses = {
      sm: 'h-9 px-3',
      md: 'h-10 px-4 py-2',
      lg: 'h-11 px-8',
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className,
    ].join(' ');

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
