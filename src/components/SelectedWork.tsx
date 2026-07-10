"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { work, type CaseStudy } from "@/lib/content";
import { CaseStudyModal } from "./CaseStudyModal";
import { SectionHeader } from "./SectionHeader";

export function SelectedWork() {
  const [activeProject, setActiveProject] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="section-padding border-t border-border bg-surface/40">
      <div className="site-container">
        <SectionHeader label={work.label} title={work.headline} description={work.lead} />

        <div className="divide-y divide-border border-y border-border">
          {work.items.map((project) => (
            <article
              key={project.id}
              className="group grid gap-8 py-12 md:grid-cols-[minmax(0,200px)_1fr_auto] md:items-start md:gap-12 md:py-14"
            >
              <div>
                <p className="font-sans text-[13px] text-accent">{project.role}</p>
                <h3 className="heading-serif mt-3 text-2xl md:text-3xl">{project.title}</h3>
                {project.tags.length > 0 && (
                  <p className="mt-3 font-sans text-[12px] text-muted">
                    {project.tags.join(" · ")}
                  </p>
                )}
              </div>

              <div className="space-y-6">
                <p className="font-sans text-base leading-relaxed text-muted md:text-[17px]">
                  {project.summary}
                </p>

                {project.metrics && project.metrics.length > 0 && (
                  <dl className="grid grid-cols-3 gap-4 border-t border-border/60 pt-6 md:gap-8">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="heading-serif text-lg leading-none text-foreground md:text-xl">
                          {metric.value}
                        </dt>
                        <dd className="mt-2 font-sans text-[12px] leading-snug text-muted md:text-[13px]">
                          {metric.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="group/btn inline-flex items-center gap-2 self-start font-sans text-[15px] text-foreground transition-colors hover:text-accent md:pt-1"
              >
                Case study
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </article>
          ))}
        </div>
      </div>

      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
