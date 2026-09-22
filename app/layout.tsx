import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { StaticNoise } from "@/components/ui/StaticNoise";

export const metadata: Metadata = {
  title: {
    default: "MEOVVNIVERSE — Gothic Tech Fan Hub & Archive",
    template: "%s | MEOVVNIVERSE",
  },
  description:
    "High-end interactive archive and fan hub for MEOVV (My Eyes Open VVide) under THEBLACKLABEL. Featuring The Coven member wiki, archaic media console with synced lyrics, and social telemetry.",
  keywords: [
    "MEOVV",
    "THEBLACKLABEL",
    "Sooin",
    "Gawon",
    "Anna",
    "Narin",
    "Ella",
    "MEOW",
    "Bite Now",
    "Gothic Tech",
  ],
  authors: [{ name: "Zhafran" }],
  openGraph: {
    title: "MEOVVNIVERSE — Gothic Tech Fan Hub & Archive",
    description:
      "Interactive digital archive for MEOVV (Sooin, Gawon, Anna, Narin, Ella).",
    url: "https://meovvniverse.vercel.app",
    siteName: "MEOVVNIVERSE",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-void text-ash min-h-screen flex flex-col antialiased selection:bg-chrome selection:text-void">
        {/* Global Grain & Scanline Shader Overlay */}
        <StaticNoise opacity={0.06} />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
