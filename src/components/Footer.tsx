import { navLinks, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border py-14 md:py-16">
      <div className="site-container">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-sans text-base font-medium text-foreground">{site.name}</p>
            <p className="mt-2 font-sans text-[13px] text-muted">{site.tagline}</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-[15px] text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 font-sans text-[13px] text-muted">{site.copyright}</p>
      </div>
    </footer>
  );
}
