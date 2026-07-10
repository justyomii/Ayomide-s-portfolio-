import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfilePortraitProps {
  alt: string;
  priority?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const widthClasses = {
  sm: "w-[160px] sm:w-[180px]",
  md: "w-[200px] sm:w-[220px]",
  lg: "w-[280px] sm:w-[320px] lg:w-[360px]",
};

export function ProfilePortrait({
  alt,
  priority = false,
  className,
  size = "lg",
}: ProfilePortraitProps) {
  return (
    <div className={cn("group relative shrink-0", widthClasses[size], className)}>
      {/* Soft glow behind — sits outside the frame */}
      <div
        className="pointer-events-none absolute -inset-6 md:-inset-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
        }}
      />

      {/* Framed portrait */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-surface/30 shadow-2xl shadow-black/40 ring-1 ring-border-strong">
        <Image
          src="/images/profile.jpg"
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-[center_20%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 320px, (max-width: 1024px) 340px, 360px"
        />
        {/* Very subtle warm tint — barely perceptible */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 40%, color-mix(in srgb, var(--accent) 6%, transparent) 100%)",
          }}
        />
        {/* Bottom fade — grounds the portrait */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          aria-hidden
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--bg) 25%, transparent) 0%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}
