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

import Script from "next/script";

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
      <head>
        <meta name="google-site-verification" content="3HnqK-VdYSw0Gvki7SZizE2J_mdws5GCxxGC8AmkTgA" />
        <meta name="yandex-verification" content="a936254ad1d2f3d9" />
        <meta name="msvalidate.01" content="09C7A42C92C510395B16F0393F057D6C" />
        <Script 
          src="https://pl30357273.effectivecpmnetwork.com/58/db/8c/58db8cb33ae9005688aec03a0f93071c.js"
          strategy="lazyOnload"
        />
        <Script 
          src="https://pl30357277.effectivecpmnetwork.com/35/fd/14/35fd14b3c895e34aa6d50a5d8e26c27e.js"
          strategy="lazyOnload"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
