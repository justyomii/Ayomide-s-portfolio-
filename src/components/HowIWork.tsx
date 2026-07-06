import { process } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function HowIWork() {
  return (
    <section id="process" className="section-padding border-t border-border">
      <div className="site-container">
        <SectionHeader label={process.label} title={process.headline} />

        <dl className="grid gap-12 sm:grid-cols-2 lg:gap-16">
          {process.steps.map((step) => (
            <div key={step.title}>
              <dt className="font-sans text-base font-medium text-foreground md:text-[17px]">
                {step.title}
              </dt>
              <dd className="mt-3 font-sans text-base leading-relaxed text-muted md:text-[17px]">
                {step.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
