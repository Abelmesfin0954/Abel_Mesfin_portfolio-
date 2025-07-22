import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abel Mesfin | Full-Stack Web Developer",
  description: "Explore the personal portfolio of Abel Mesfin, a creative full-stack web developer from Ethiopia.",
  keywords: [
    "Abel Mesfin",
    "Abel web Developer",
    "AMWIC Digtal Solution",
    "AMWIC",
    "Abel Mesfin website Developer",
    "Full-Stack Developer",
    "Web Developer",
    "Ethiopian Developer",
    "Ethiopian website Developer",
    "Portfolio",
    "Addis Ababa Developer",
    "Addis Ababa Website Developer",
    "React Developer",
    "Next.js Developer",
    "JavaScript Developer"
  ],
  authors: [{ name: "Abel Mesfin" }],
  creator: "Abel Mesfin",
  openGraph: {
    title: "Abel Mesfin | Full-Stack Web Developer",
    description: "Explore the personal portfolio of Abel Mesfin, a creative full-stack web developer from Ethiopia.",
    url: "https://abelmesfin.com",
    siteName: "Abel Mesfin Portfolio",
    images: [
      {
        url: "https://yourportfolio.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abel Mesfin Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abel Mesfin | Full-Stack Web Developer",
    description: "Explore the personal portfolio of Abel Mesfin, a creative full-stack web developer from Ethiopia.",
    images: ["https://yourportfolio.com/og-image.jpg"],
    creator: "@abelmesfin",
  },
  themeColor: "#030014",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // About Me section in metadata
  other: {
    "about-me": `
      Hello! I'm Abel Mesfin, a passionate full-stack web developer based in Ethiopia.
      With expertise in modern web technologies like React, Next.js, Node.js, and more,
      I create performant and user-friendly web applications. 
      
      My journey in web development began 4 years ago, and since then I've worked on
      various projects ranging from small business websites to complex web applications.
      
      When I'm not coding, I enjoy [your hobbies/interests]. I'm always open to new
      opportunities and collaborations, so feel free to reach out!
    `,
    "technical-skills": "JavaScript, TypeScript, React, Next.js, Node.js, Express, MongoDB,PHP ,MySQL,HTML,CSS, PostgreSQL, Git, Docker",
    "years-of-experience": "4+",
    "education": "BSc in Computer Science, Addis Ababa University",
    "High School": "Website Development, Gelan General Secondary School",
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}