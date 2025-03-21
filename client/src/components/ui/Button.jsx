import React from 'react';
import { cn } from "../../utils/helper";

const Button = React.forwardRef(({
    className,
    variant = "default",
    size = "default",
    children,
    asChild = false,
    ...props
}, ref) => {
    const Comp = asChild ? React.Children.only(children).type : "button";

    return (
        <Comp
            className={cn(
                "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                // Variants
                {
                    "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
                    "border border-input hover:bg-accent hover:text-accent-foreground": variant === "outline",
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
                    "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
                    "underline-offset-4 hover:underline text-primary": variant === "link",
                },
                // Sizes
                {
                    "h-10 py-2 px-4": size === "default",
                    "h-9 px-3 rounded-md": size === "sm",
                    "h-11 px-8 rounded-md": size === "lg",
                },
                className
            )}
            ref={ref}
            {...props}
        >
            {children}
        </Comp>
    );
});

Button.displayName = "Button";

export { Button };