import { expertise } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function Expertise() {
  return (
    <section id="expertise" className="section-padding border-t border-border">
      <div className="site-container">
        <SectionHeader
          label={expertise.label}
          title={expertise.headline}
          description={expertise.lead}
        />

        <div className="divide-y divide-border border-y border-border">
          {expertise.items.map((item) => (
            <div
              key={item.title}
              className="grid gap-4 py-8 md:grid-cols-[minmax(0,220px)_1fr] md:items-baseline md:gap-16 md:py-10"
            >
              <h3 className="font-sans text-base font-medium text-foreground md:text-[17px]">
                {item.title}
              </h3>
              <div>
                <p className="font-sans text-base leading-relaxed text-muted md:text-[17px]">
                  {item.description}
                </p>
                <p className="mt-3 font-sans text-[13px] text-muted/80">{item.tools.join(" · ")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
