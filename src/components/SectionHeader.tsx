interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ label, title, description, className = "" }: SectionHeaderProps) {
  return (
    <header className={`mb-14 md:mb-16 lg:mb-20 ${className}`}>
      <p className="section-label">{label}</p>
      <h2 className="heading-display mt-4 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-muted md:text-[17px]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
