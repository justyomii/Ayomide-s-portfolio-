import { certifications } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function Certifications() {
  return (
    <section id="credentials" className="section-padding border-t border-border bg-surface/30">
      <div className="site-container">
        <SectionHeader label={certifications.label} title={certifications.headline} />

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {certifications.items.map((item) => (
            <article key={item.title} className="border-t border-border pt-8">
              <h3 className="font-sans text-base font-medium text-foreground md:text-[17px]">
                {item.title}
              </h3>
              <p className="mt-1 font-sans text-[13px] text-accent">{item.issuer}</p>
              <p className="mt-3 font-sans text-base leading-relaxed text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
