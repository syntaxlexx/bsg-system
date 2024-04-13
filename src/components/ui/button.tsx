import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200",
        destructive:
          "text-white bg-red-500 hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-zinc-100 dark:bg-transparent text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 outline outline-1 outline-zinc-300 dark:outline-zinc-600",
        subtle:
          "hover:bg-zinc-200 dark:hover:bg-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100",
        ghost:
          "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 data-[state=open]:bg-transparent data-[state=open]:bg-transparent",
        link:
          "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md text-xs",
        xs: "h-8 px-1.5 rounded-sm text-xs",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
        iconsm: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      isLoading,
      size,
      icon,
      iconSuffix,
      asChild = false,
      ...props
    },
    ref
  ) => {
    if (asChild)
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {!isLoading && icon ? <div className="mr-2">{icon}</div> : null}
        {children}
        {!isLoading && iconSuffix ? (
          <div className="ml-2">{iconSuffix}</div>
        ) : null}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
