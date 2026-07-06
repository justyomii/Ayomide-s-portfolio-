import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfilePortraitProps {
  alt: string;
  priority?: boolean;
  className?: string;
  size?: "md" | "lg";
}

const widthClasses = {
  md: "w-[200px] sm:w-[220px]",
  lg: "w-[240px] sm:w-[280px] lg:w-[320px]",
};

export function ProfilePortrait({
  alt,
  priority = false,
  className,
  size = "lg",
}: ProfilePortraitProps) {
  return (
    <div className={cn("relative shrink-0", widthClasses[size], className)}>
      <div className="portrait-glow pointer-events-none absolute -inset-10 md:-inset-14" aria-hidden />

      <div className="relative aspect-[3/4] w-full">
        <Image
          src="/images/profile.jpg"
          alt={alt}
          fill
          priority={priority}
          className="object-cover object-[center_12%]"
          sizes="(max-width: 640px) 280px, 320px"
        />
        <div className="portrait-vignette pointer-events-none absolute inset-0" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-accent/[0.06] mix-blend-soft-light"
          aria-hidden
        />
      </div>
    </div>
  );
}
