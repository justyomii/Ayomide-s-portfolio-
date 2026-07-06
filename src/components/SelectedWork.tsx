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

        <div className="space-y-0 divide-y divide-border border-y border-border">
          {work.items.map((project) => (
            <article
              key={project.id}
              className="grid gap-6 py-10 md:grid-cols-[minmax(0,180px)_1fr_auto] md:items-start md:gap-12 md:py-12"
            >
              <div>
                <p className="font-sans text-[13px] text-accent">{project.role}</p>
                <h3 className="heading-serif mt-3 text-2xl md:text-3xl">{project.title}</h3>
              </div>

              <p className="font-sans text-base leading-relaxed text-muted md:text-[17px]">
                {project.summary}
              </p>

              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="group inline-flex items-center gap-2 self-start font-sans text-[15px] text-foreground transition-colors hover:text-accent md:pt-1"
              >
                Case study
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </article>
          ))}
        </div>
      </div>

      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
