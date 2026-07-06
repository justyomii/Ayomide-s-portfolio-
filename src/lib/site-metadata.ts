import type { Metadata } from "next";
import { site } from "@/lib/content";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? site.portfolioUrl;
}

const title = `${site.name} | ${site.title}`;
const description =
  "Executive virtual assistant for founders. Inbox, calendar, travel, and operations handled with care. Based in Nigeria, remote, aligned to European hours.";

export function createSiteMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${site.shortName} Adeyi`,
    },
    description,
    applicationName: site.name,
    category: "business",
    keywords: [
      "virtual personal assistant",
      "executive assistant Nigeria",
      "remote administrative assistant",
      "operations support",
      "travel coordination",
      "inbox management",
      "European timezone assistant",
      "ALX virtual assistant",
    ],
    authors: [{ name: site.name, url: siteUrl }],
    creator: site.name,
    publisher: site.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: site.name,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-icon", sizes: "180x180" }],
    },
  };
}
