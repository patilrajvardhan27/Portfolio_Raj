import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portfolio - Full Stack Developer",
  description: "A modern portfolio showcasing my work and skills as a Full Stack Developer",
  keywords: ["portfolio", "web developer", "full stack", "react", "next.js"],
  authors: [{ name: "Raj" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
