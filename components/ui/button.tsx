import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
// We'll need to create lib/utils if it doesn't exist, which typically exports clsx + tailwind-merge wrapper 'cn'

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                default: "bg-[var(--accent-emphasis)] hover:opacity-90 text-white focus:ring-[var(--accent-emphasis)]", // btn-primary logic
                secondary: "bg-[var(--bg-canvas-subtle)] border border-[var(--border-default)] hover:border-[var(--border-emphasis)] text-[var(--fg-default)] focus:ring-[var(--border-emphasis)]", // btn-secondary logic
                success: "bg-[var(--success-emphasis)] hover:opacity-90 text-white focus:ring-[var(--success-emphasis)]", // btn-success logic
                danger: "bg-[var(--danger-emphasis)] hover:opacity-90 text-white focus:ring-[var(--danger-emphasis)]", // btn-danger logic
                ghost: "hover:bg-[var(--bg-canvas)] text-[var(--fg-default)]",
                link: "text-[var(--accent-emphasis)] hover:underline",
            },
            size: {
                default: "px-3 py-1.5",
                sm: "px-2 py-1 text-xs",
                lg: "px-4 py-2 text-sm",
                icon: "h-8 w-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
