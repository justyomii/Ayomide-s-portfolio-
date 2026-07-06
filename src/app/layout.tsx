import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { StructuredData } from "@/components/StructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ayoadeyi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adeyi Ayomide Ephrathah | Virtual Personal Assistant",
    template: "%s | Adeyi Ayomide",
  },
  description:
    "Executive virtual assistant based in Nigeria. Inbox, calendar, travel, and operations support for founders. Remote, aligned to European hours.",
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
  authors: [{ name: "Adeyi Ayomide Ephrathah", url: siteUrl }],
  creator: "Adeyi Ayomide Ephrathah",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Adeyi Ayomide Ephrathah",
    title: "Adeyi Ayomide Ephrathah | Virtual Personal Assistant",
    description:
      "Executive virtual assistant for founders. Inbox, calendar, travel, and operations handled with care.",
    images: [
      {
        url: "/images/profile.jpg",
        width: 800,
        height: 1000,
        alt: "Adeyi Ayomide Ephrathah, Virtual Personal Assistant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adeyi Ayomide Ephrathah | Virtual Personal Assistant",
    description:
      "Executive virtual assistant for founders. Inbox, calendar, travel, and operations handled with care.",
    images: ["/images/profile.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f3" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen font-sans">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
          >
            Skip to main content
          </a>
          <Navigation />
          <main id="main-content">{children}</main>
          <Footer />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--surface-elevated)",
                border: "1px solid var(--border-strong)",
                color: "var(--foreground)",
              },
            }}
          />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
