import { About } from "@/components/About";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Expertise } from "@/components/Expertise";
import { Hero } from "@/components/Hero";
import { HowIWork } from "@/components/HowIWork";
import { SelectedWork } from "@/components/SelectedWork";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <SelectedWork />
      <HowIWork />
      <Certifications />
      <Contact />
    </>
  );
}
