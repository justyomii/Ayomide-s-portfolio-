import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[140px] w-full resize-y rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground",
      "placeholder:text-muted transition-colors",
      "hover:border-border-strong focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";
