"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect } from "react";
import type { CaseStudy } from "@/lib/content";

interface CaseStudyModalProps {
  project: CaseStudy | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/80"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[5%] z-[70] mx-auto max-h-[90vh] max-w-2xl overflow-y-auto border border-border bg-background md:inset-x-auto"
          >
            <div className="flex items-start justify-between border-b border-border px-6 py-6 md:px-8">
              <div>
                <p className="font-sans text-[13px] text-accent">{project.role}</p>
                <h2 id="case-study-title" className="heading-display mt-2 text-3xl md:text-4xl">
                  {project.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center text-muted transition-colors hover:text-foreground"
                aria-label="Close case study"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-8 px-6 py-8 font-sans md:px-8">
              <p className="text-base leading-relaxed text-muted md:text-[17px]">
                {project.caseStudy.overview}
              </p>

              <div>
                <h3 className="text-[13px] font-medium text-foreground">Challenge</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {project.caseStudy.challenge}
                </p>
              </div>

              <div>
                <h3 className="text-[13px] font-medium text-foreground">Approach</h3>
                <ul className="mt-3 space-y-2">
                  {project.caseStudy.approach.map((step) => (
                    <li key={step} className="text-base leading-relaxed text-muted">
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-[13px] font-medium text-foreground">Results</h3>
                <ul className="mt-3 space-y-2">
                  {project.caseStudy.results.map((result) => (
                    <li key={result} className="text-base leading-relaxed text-muted">
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[13px] text-muted">{project.caseStudy.tools.join(" · ")}</p>

              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-6 border-t border-border pt-8">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[15px] text-accent hover:underline"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
