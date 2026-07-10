"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";

export function Certifications() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="credentials"
      className="section-padding border-t border-border bg-surface/30"
    >
      <div className="site-container">
        <SectionHeader label={certifications.label} title={certifications.headline} />

        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {certifications.items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group flex gap-5 rounded-2xl border border-border bg-background/40 p-7 transition-colors hover:border-accent/40 md:p-8"
            >
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/5 text-accent"
              >
                <Award className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <div>
                <h3 className="font-sans text-base font-medium text-foreground md:text-[17px]">
                  {item.title}
                </h3>
                <p className="mt-1 font-sans text-[12px] uppercase tracking-wider text-accent">
                  {item.issuer}
                </p>
                <p className="mt-4 font-sans text-[15px] leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
