import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

// ✅ Enhanced SignInButton component with improved UI effects
const SignInButton = React.forwardRef(
  ({ className, children = "Sign In", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="default"
        size="default"
        className={cn(
          // Base styling
          "w-full font-medium py-3 px-6 rounded-lg border-0 shadow-md",
          // Gradient background with project colors (pink theme)
          "bg-gradient-to-r from-pink-600 to-pink-700 text-white",
          // Enhanced hover effects
          "hover:from-pink-700 hover:to-pink-800 hover:shadow-lg hover:shadow-xl",
          // Click/Active effects
          "active:from-pink-800 active:to-pink-900 active:scale-95",
          // Smooth transitions
          "transition-all duration-300 ease-in-out transform",
          // Focus effects for accessibility
          "focus:ring-2 focus:ring-pink-500 focus:ring-offset-2",
          // Disabled state
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 disabled:hover:shadow-md",
          // Hover scale effect
          "hover:scale-105",
          // Cursor pointer
          "cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

SignInButton.displayName = "SignInButton";

export { Button, buttonVariants, SignInButton };
