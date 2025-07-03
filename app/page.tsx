import Encryption from "@/components/main/Encryption";
import Hero from "@/components/main/Hero";
import Skills from "@/components/main/Skills";
import Image from "next/image";
import About from '@/components/main/about';
import Contact from '@/components/main/Contact';
import Awards from '@/components/main/Awards';
import TestimonialsSection from "@/components/main/blog";
import TerminalSection from "@/components/main/TerminalSection";
import Services from "@/components/main/Services";


export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <About />
        <Skills />
        <Awards />
        <TestimonialsSection />
        <TerminalSection />
        <Services />
        <Encryption />
        <Contact />
        </div>
    </main>
  );
}
