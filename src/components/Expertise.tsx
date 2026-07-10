"use client";

import { motion, useReducedMotion } from "framer-motion";
import { expertise } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function Expertise() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="expertise" className="section-padding border-t border-border">
      <div className="site-container">
        <SectionHeader
          label={expertise.label}
          title={expertise.headline}
          description={expertise.lead}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:gap-5">
          {expertise.items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col rounded-2xl border border-border bg-surface/40 p-7 transition-all hover:border-accent/40 hover:bg-surface/70 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="heading-serif text-xl text-foreground md:text-2xl">
                  {item.title}
                </h3>
                <span
                  aria-hidden
                  className="font-serif text-[13px] text-accent/60 group-hover:text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-4 font-sans text-[15px] leading-[1.7] text-muted md:text-base">
                {item.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-1.5">
                {item.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex rounded-full border border-border bg-background/50 px-2.5 py-0.5 font-sans text-[11px] text-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
