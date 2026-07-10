"use client";

import { motion, useReducedMotion } from "framer-motion";
import { process } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function HowIWork() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="section-padding border-t border-border">
      <div className="site-container">
        <SectionHeader label={process.label} title={process.headline} description={process.lead} />

        <ol className="relative grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14 lg:grid-cols-4 lg:gap-x-8">
          {process.steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-[13px] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden />
              </div>

              <h3 className="mt-5 font-sans text-base font-medium text-foreground md:text-[17px]">
                {step.title}
              </h3>

              <p className="mt-3 font-sans text-[15px] leading-relaxed text-muted md:text-base md:leading-[1.7]">
                {step.description}
              </p>

              {step.artifact && (
                <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-3 py-1.5 font-sans text-[12px] text-muted">
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
                  {step.artifact}
                </p>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
