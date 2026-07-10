import { Linkedin, Mail } from "lucide-react";
import { navLinks, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border py-14 md:py-16">
      <div className="site-container">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-16">
          <div>
            <p className="heading-serif text-2xl text-foreground md:text-3xl">
              {site.name}
            </p>
            <p className="mt-3 font-sans text-[13px] text-muted">{site.tagline}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3.5 py-1.5 font-sans text-[12px] text-muted transition-colors hover:border-accent/40 hover:text-accent"
                aria-label="Email Ayomide"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden />
                Email
              </a>
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3.5 py-1.5 font-sans text-[12px] text-muted transition-colors hover:border-accent/40 hover:text-accent"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-3.5 w-3.5" aria-hidden />
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Footer navigation" className="md:text-right">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-[14px] text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-3 border-t border-border pt-8 font-sans text-[12px] text-muted md:flex-row md:items-center md:justify-between">
          <p>{site.copyright}</p>
          <p>Designed and built with care.</p>
        </div>
      </div>
    </footer>
  );
}
