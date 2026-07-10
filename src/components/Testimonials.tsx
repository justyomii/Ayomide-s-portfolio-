"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  const reduceMotion = useReducedMotion();

  if (!testimonials.items.length) return null;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-border bg-gradient-to-b from-surface/60 via-surface-elevated/40 to-surface/60 section-padding"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="site-container relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">{testimonials.label}</p>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.25rem)] text-balance">
            {testimonials.headline}
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-muted md:text-[17px]">
            {testimonials.lead}
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
          {testimonials.items.map((item, index) => (
            <motion.figure
              key={item.author}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col rounded-2xl border border-border bg-background/60 p-8 backdrop-blur-sm transition-colors hover:border-border-strong md:p-10"
            >
              <Quote
                className="absolute right-6 top-6 h-6 w-6 text-accent/25"
                aria-hidden
                strokeWidth={1.5}
              />
              <blockquote className="font-serif text-lg leading-[1.5] text-foreground md:text-xl md:leading-[1.45]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-auto pt-8 font-sans">
                <p className="text-[15px] font-medium text-foreground">{item.author}</p>
                <p className="mt-1 text-[13px] text-muted">{item.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
