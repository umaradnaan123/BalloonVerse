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
  title: "Free Balloon Pop Math Games for Kids | BalloonVerse",
  description: "Play BalloonVerse, a free interactive online balloon pop math game. Practice math facts in addition, subtraction, multiplication, and division today!",
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
  applicationName: "BalloonVerse",
  authors: [{ name: "Adnaan Faiz", url: "https://balloon-verse.vercel.app" }],
  publisher: "BalloonVerse",
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "https://balloon-verse.vercel.app",
  },
  openGraph: {
    title: "Free Balloon Pop Math Games for Kids | BalloonVerse",
    description: "Play BalloonVerse, a free interactive online balloon pop math game. Practice math facts in addition, subtraction, multiplication, and division today!",
    url: "https://balloon-verse.vercel.app",
    type: "website",
    siteName: "BalloonVerse",
    locale: "en_US",
    images: [
      {
        url: "https://balloon-verse.vercel.app/icon.png",
        width: 512,
        height: 512,
        alt: "BalloonVerse Logo Preview Banner"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Balloon Pop Math Games for Kids | BalloonVerse",
    description: "Play BalloonVerse, a free interactive online balloon pop math game. Practice math facts in addition, subtraction, multiplication, and division today!",
    images: ["https://balloon-verse.vercel.app/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

import type { Viewport } from "next";
export const viewport: Viewport = {
  themeColor: "#4F46E5",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
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
