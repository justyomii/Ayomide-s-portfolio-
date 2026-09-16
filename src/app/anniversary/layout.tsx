import type { Metadata } from "next";
import { Cinzel, Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: "Seven Months" },
  description: "A quiet celebration.",
  robots: { index: false, follow: false },
};

export default function AnniversaryLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${lora.variable} ${cinzel.variable}`}>{children}</div>;
}
