"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { hero, site } from "@/lib/content";
import { ProfilePortrait } from "./ProfilePortrait";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-border">
      <div className="site-container pb-24 pt-24 md:pb-36 md:pt-28 lg:pb-40 lg:pt-32">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_auto] lg:gap-20 xl:gap-28">
          <div className="max-w-xl">
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="heading-display text-[clamp(2.75rem,7.5vw,4.75rem)] text-balance"
            >
              {hero.headline}{" "}
              <span className="italic text-accent">{hero.headlineAccent}</span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="mt-8 font-sans text-[15px] text-muted md:text-base"
            >
              {hero.name}
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="mt-2 font-sans text-base text-accent md:text-lg"
            >
              {hero.role}
            </motion.p>

            <motion.p
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              className="mt-10 max-w-md font-sans text-base leading-[1.75] text-muted md:text-[17px]"
            >
              {hero.tagline}
            </motion.p>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.22 }}
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
                className="inline-flex items-center justify-center rounded-md border border-accent/40 px-5 py-2.5 font-sans text-[15px] font-medium text-accent transition-colors hover:border-accent hover:bg-accent/5"
              >
                {hero.bookCta.label}
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="flex shrink-0 justify-center lg:justify-end lg:pt-2"
          >
            <ProfilePortrait alt={site.name} priority size="lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
