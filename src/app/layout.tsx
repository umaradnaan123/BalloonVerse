import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BalloonVerse – Free Balloon Pop Math Games for Kids",
  description: "Play BalloonVerse, a free interactive balloon pop math game for kids. Practice addition, subtraction, multiplication, division, and improve math skills online.",
  keywords: [
    "balloon pop game",
    "balloon math game",
    "free math games",
    "kids math games",
    "online math games",
    "educational games",
    "learning games",
    "addition games",
    "subtraction games",
    "multiplication games",
    "division games",
    "kindergarten math games"
  ],
  alternates: {
    canonical: "https://balloonverse.vercel.app",
  },
  openGraph: {
    title: "BalloonVerse – Free Balloon Pop Math Games for Kids",
    description: "Play BalloonVerse, a free interactive balloon pop math game for kids.",
    url: "https://balloonverse.vercel.app",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BalloonVerse – Free Balloon Pop Math Games for Kids",
    description: "Play BalloonVerse, a free interactive balloon pop math game for kids.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
