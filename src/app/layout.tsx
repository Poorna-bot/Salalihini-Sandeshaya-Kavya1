import type { Metadata, Viewport } from "next";
import {
  Geist,
  Cormorant_Garamond,
  Noto_Serif_Sinhala,
  Noto_Sans_Sinhala,
} from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { SceneLoader } from "@/components/SceneLoader";
import { LoadingScreen } from "@/components/LoadingScreen";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const notoSerifSinhala = Noto_Serif_Sinhala({
  subsets: ["sinhala", "latin"],
  variable: "--font-noto-serif-si",
});

const notoSansSinhala = Noto_Sans_Sinhala({
  subsets: ["sinhala", "latin"],
  variable: "--font-noto-sans-si",
});

export const metadata: Metadata = {
  title: {
    default: "සැළලිහිණි සංදේශය · Salalihini Sandeshaya",
    template: "%s · Salalihini Sandeshaya",
  },
  description:
    "Read all 111 verses of the fifteenth-century Sinhala classic Salalihini Sandeshaya (The Starling's Message) with explanations in Sinhala and English, as a starling flies from Kotte to Kelaniya.",
  openGraph: {
    title: "සැළලිහිණි සංදේශය · Salalihini Sandeshaya",
    description:
      "Read all 111 verses of the fifteenth-century Sinhala classic Salalihini Sandeshaya with explanations in Sinhala and English.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#030816",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${cormorant.variable} ${notoSerifSinhala.variable} ${notoSansSinhala.variable}`}
    >
      <body className="antialiased selection:bg-gold selection:text-[#030816]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-full focus:bg-gold focus:text-[#030816]"
        >
          Skip to main content
        </a>
        <LoadingScreen />
        <SceneLoader />
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
