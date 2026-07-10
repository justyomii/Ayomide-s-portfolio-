"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { availability, hero, site } from "@/lib/content";
import { ProfilePortrait } from "./ProfilePortrait";

const stateStyles: Record<typeof availability.state, string> = {
  open: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  limited: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  closed: "bg-red-500/10 text-red-400 border-red-500/30",
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="site-container relative pb-24 pt-28 md:pb-36 md:pt-32 lg:pb-40 lg:pt-40">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:items-start lg:gap-20 xl:gap-24">
          <div className="max-w-xl">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-sans text-[12px] font-medium tracking-wide ${stateStyles[availability.state]}`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
              </span>
              {availability.label}
              <span className="hidden text-current/70 sm:inline">· {availability.detail}</span>
            </motion.div>

            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="heading-display mt-6 text-[clamp(2.75rem,7.5vw,4.75rem)] text-balance"
            >
              {hero.headline}{" "}
              <span className="italic text-accent">{hero.headlineAccent}</span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="mt-8 font-sans text-[15px] text-muted md:text-base"
            >
              {hero.name}
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mt-2 font-sans text-base text-accent md:text-lg"
            >
              {hero.role}
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.22 }}
              className="mt-10 max-w-md font-sans text-base leading-[1.75] text-muted md:text-[17px]"
            >
              {hero.tagline}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.26 }}
              className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10"
            >
              <a
                href={hero.primaryCta.href}
                className="group inline-flex items-center gap-2 font-sans text-[15px] font-medium text-foreground transition-colors hover:text-accent"
              >
                {hero.primaryCta.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={hero.bookCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-accent/40 bg-accent/5 px-5 py-2.5 font-sans text-[15px] font-medium text-accent transition-all hover:border-accent hover:bg-accent/10"
              >
                {hero.bookCta.label}
              </a>
            </motion.div>

            <motion.dl
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-16 grid grid-cols-3 gap-6 border-t border-border pt-8 md:gap-10"
            >
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="heading-serif text-[clamp(1.5rem,3vw,2rem)] leading-none text-foreground">
                    {stat.value}
                  </dt>
                  <dd className="mt-2 font-sans text-[12px] leading-snug text-muted md:text-[13px]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="flex flex-col items-center gap-5 lg:sticky lg:top-32 lg:items-stretch lg:pt-14 xl:pt-16"
          >
            <ProfilePortrait alt={site.name} priority size="hero" className="w-full" />
            <div className="flex items-center justify-between gap-4 font-sans text-[11px] uppercase tracking-[0.14em] text-muted">
              <span>{site.location}</span>
              <span className="h-px flex-1 bg-border" aria-hidden />
              <span>European hours</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
