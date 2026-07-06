import { site } from "@/lib/content";

export function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ayoadeyi.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl,
    jobTitle: site.title,
    description:
      "Virtual Personal Assistant providing remote admin, operations, travel coordination, and community support for founders.",
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    knowsAbout: [
      "Virtual Assistance",
      "Email Management",
      "Calendar Management",
      "Travel Coordination",
      "Operations Support",
      "Social Media Management",
      "Community Management",
    ],
    areaServed: "Worldwide",
    workLocation: {
      "@type": "Place",
      name: "Remote",
    },
    sameAs: site.linkedin ? [site.linkedin] : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
