import React from 'react';

type BannerProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'destructive';
};

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseClasses = 'relative rounded-lg border px-4 py-3 text-sm';

    const variantClasses = {
      default: 'bg-background text-foreground',
      destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
    };

    const classes = [
      baseClasses,
      variantClasses[variant],
      className,
    ].join(' ');

    return (
      <div
        ref={ref}
        role="alert"
        className={classes}
        {...props}
      />
    );
  }
);
Banner.displayName = 'Banner';

const BannerTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className}`}
    {...props}
  />
));
BannerTitle.displayName = 'BannerTitle';

const BannerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  />
));
BannerDescription.displayName = 'BannerDescription';

export { Banner, BannerTitle, BannerDescription };
