import type { Metadata } from "next";
import { Lora } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: "A letter for you" },
  description: "A quiet letter.",
  robots: { index: false, follow: false },
};

export default function LetterLayout({ children }: { children: React.ReactNode }) {
  return <div className={lora.variable}>{children}</div>;
}
