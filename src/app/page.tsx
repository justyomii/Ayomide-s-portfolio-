import { About } from "@/components/About";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Expertise } from "@/components/Expertise";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HowIWork } from "@/components/HowIWork";
import { Packages } from "@/components/Packages";
import { SelectedWork } from "@/components/SelectedWork";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Testimonials />
      <About />
      <Expertise />
      <Packages />
      <HowIWork />
      <FAQ />
      <Certifications />
      <Contact />
    </>
  );
}
