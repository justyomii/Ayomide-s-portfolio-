import { about } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="about" className="section-padding border-t border-border">
      <div className="site-container">
        <SectionHeader label={about.label} title={about.headline} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
          <div className="space-y-6 font-sans text-base leading-[1.75] text-muted md:text-[17px]">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <aside className="h-fit lg:sticky lg:top-32">
            <dl className="space-y-6 border-t border-border pt-8 lg:border-t-0 lg:pt-0">
              {about.highlights.map((item) => (
                <div key={item.label}>
                  <dt className="font-sans text-[13px] text-accent">{item.label}</dt>
                  <dd className="mt-1.5 font-sans text-[15px] text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
