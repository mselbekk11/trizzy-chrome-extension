import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

const buttonVariants = cva(
  "plasmo-inline-flex plasmo-items-center plasmo-justify-center plasmo-gap-2 plasmo-whitespace-nowrap plasmo-rounded-md plasmo-text-sm plasmo-font-medium plasmo-transition-all plasmo-disabled:pointer-events-none plasmo-disabled:opacity-50 [&_svg]:plasmo-pointer-events-none [&_svg:not([class*='size-'])]:plasmo-size-4 plasmo-shrink-0 [&_svg]:plasmo-shrink-0 plasmo-outline-none plasmo-focus-visible:border-ring plasmo-focus-visible:ring-ring/50 plasmo-focus-visible:ring-[3px] plasmo-aria-invalid:ring-destructive/20 plasmo-dark:aria-invalid:ring-destructive/40 plasmo-aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "plasmo-bg-primary plasmo-text-primary-foreground plasmo-shadow-xs hover:plasmo-bg-primary/90",
        destructive:
          "plasmo-bg-destructive plasmo-text-white plasmo-shadow-xs hover:plasmo-bg-destructive/90 plasmo-focus-visible:ring-destructive/20 plasmo-dark:focus-visible:ring-destructive/40 plasmo-dark:bg-destructive/60",
        outline:
          "plasmo-border plasmo-bg-background plasmo-shadow-xs hover:plasmo-bg-accent hover:plasmo-text-accent-foreground plasmo-dark:bg-input/30 plasmo-dark:border-input plasmo-dark:hover:bg-input/50",
        secondary:
          "plasmo-bg-secondary plasmo-text-secondary-foreground plasmo-shadow-xs hover:plasmo-bg-secondary/80",
        ghost:
          "hover:plasmo-bg-accent hover:plasmo-text-accent-foreground plasmo-dark:hover:bg-accent/50",
        link: "plasmo-text-primary plasmo-underline-offset-4 hover:plasmo-underline"
      },
      size: {
        default: "plasmo-h-9 plasmo-px-4 plasmo-py-2 has-[>svg]:plasmo-px-3",
        sm: "plasmo-h-8 plasmo-rounded-md plasmo-gap-1.5 plasmo-px-3 has-[>svg]:plasmo-px-2.5",
        lg: "plasmo-h-10 plasmo-rounded-md plasmo-px-6 has-[>svg]:plasmo-px-4",
        icon: "plasmo-size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
