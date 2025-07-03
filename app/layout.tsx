import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import About from '@/components/main/about';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abel Mesfin | Full-Stack Web Developer",
  description: "Explore the personal portfolio of Abel Mesfin, a creative full-stack web developer from Ethiopia.",
  keywords: ["Abel Mesfin", "Web Developer", "Portfolio", "Full Stack", "React", "Next.js", "Ethiopia"],
  authors: [{ name: "Abel Mesfin" }],
  creator: "Abel Mesfin",
  openGraph: {
    title: "Abel Mesfin Portfolio",
    description: "Explore the work and skills of Abel Mesfin.",
    url: "https://your-portfolio-url.com",
    siteName: "Abel Mesfin Portfolio",
    images: [
      {
        url: "/og-image.png", // Place your image in the public folder
        width: 1200,
        height: 630,
        alt: "Abel Mesfin Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        <StarsCanvas />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
