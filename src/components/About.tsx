import { about, site } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";
import { ProfilePortrait } from "./ProfilePortrait";

export function About() {
  return (
    <section id="about" className="section-padding border-t border-border">
      <div className="site-container">
        <SectionHeader label={about.label} title={about.headline} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
          <div>
            <div className="space-y-6 font-sans text-base leading-[1.8] text-muted md:text-[17px]">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 border-l-2 border-accent/50 pl-5">
              <p className="font-serif text-lg italic text-foreground md:text-xl">
                Also known as {site.alias} in the Web3 communities I&apos;ve worked with.
              </p>
            </div>
          </div>

          <aside className="h-fit space-y-8 lg:sticky lg:top-32">
            <div className="hidden lg:block">
              <ProfilePortrait alt={about.imageAlt} size="md" className="mx-auto" />
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 lg:grid-cols-1 lg:pt-0 lg:border-t-0">
              {about.highlights.map((item) => (
                <div key={item.label}>
                  <dt className="font-sans text-[12px] uppercase tracking-wider text-accent">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 font-sans text-[15px] leading-snug text-foreground">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
