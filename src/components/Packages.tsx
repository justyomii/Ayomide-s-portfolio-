"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { packages } from "@/lib/content";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

export function Packages() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="packages" className="section-padding border-t border-border">
      <div className="site-container">
        <SectionHeader
          label={packages.label}
          title={packages.headline}
          description={packages.lead}
        />

        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {packages.items.map((pkg, index) => {
            const featured = "featured" in pkg && pkg.featured;
            return (
              <motion.article
                key={pkg.name}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group flex flex-col border-t pt-8 transition-colors md:border-t-0 md:border-l md:pl-8 md:pt-0",
                  featured ? "border-accent/50" : "border-border md:hover:border-accent/40",
                )}
              >
                <p
                  className={cn(
                    "font-sans text-[12px] uppercase tracking-[0.14em]",
                    featured ? "text-accent" : "text-muted",
                  )}
                >
                  {String(index + 1).padStart(2, "0")} — {pkg.tagline}
                </p>

                <h3
                  className={cn(
                    "heading-serif mt-4 text-3xl md:text-[32px]",
                    featured ? "text-foreground" : "text-foreground",
                  )}
                >
                  {pkg.name}
                </h3>

                <p className="mt-5 font-sans text-[15px] leading-[1.7] text-muted md:text-base md:leading-[1.75]">
                  {pkg.description}
                </p>

                <a
                  href={pkg.cta.href}
                  target={pkg.cta.href.startsWith("http") ? "_blank" : undefined}
                  rel={pkg.cta.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={cn(
                    "group/cta mt-8 inline-flex items-center gap-2 self-start font-sans text-[15px] font-medium transition-colors",
                    featured
                      ? "text-accent hover:text-accent-hover"
                      : "text-foreground hover:text-accent",
                  )}
                >
                  {pkg.cta.label}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </a>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-16 max-w-xl font-sans text-[14px] leading-relaxed text-muted md:mt-20">
          Scope, hours, and rate are set together on the discovery call — every engagement is different.{" "}
          <a href="#contact" className="text-accent transition-colors hover:text-accent-hover">
            Send a message
          </a>{" "}
          if none of these fit and we&apos;ll shape something that does.
        </p>
      </div>
    </section>
  );
}
