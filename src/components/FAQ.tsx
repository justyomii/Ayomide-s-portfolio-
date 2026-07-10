"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/lib/content";

export function FAQ() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" className="section-padding border-t border-border bg-surface/30">
      <div className="site-container">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="section-label">{faq.label}</p>
            <h2 className="heading-display mt-4 text-[clamp(1.75rem,4vw,2.75rem)] text-balance">
              {faq.headline}
            </h2>
            <p className="mt-6 font-sans text-base leading-relaxed text-muted">
              Not seeing your question?{" "}
              <a href="#contact" className="text-accent transition-colors hover:text-accent-hover">
                Send it directly
              </a>{" "}
              — I reply within 24 hours.
            </p>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {faq.items.map((item, index) => (
              <motion.li
                key={item.question}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <details className="group py-6 md:py-7">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-sans text-base font-medium text-foreground transition-colors hover:text-accent md:text-[17px]">
                    <span>{item.question}</span>
                    <Plus
                      className="h-5 w-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-accent"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-4 font-sans text-[15px] leading-[1.75] text-muted md:text-base">
                    {item.answer}
                  </p>
                </details>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
