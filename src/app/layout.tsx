import type { Metadata } from "next";
import { Geist, Geist_Mono, Ma_Shan_Zheng } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { ErrorBoundary } from "@/components/error-boundary";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const maShanZheng = Ma_Shan_Zheng({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ma-shan-zheng",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "JensenZhong - Digital Nomad & Developer",
    template: "%s | JensenZhong",
  },
  description:
    "Personal website of JensenZhong - Influencer (>581K followers), Chromium Developer, Web Developer, and Digital Nomad. Exploring AI, coding, gaming, and life.",
  keywords: [
    "JensenZhong",
    "Digital Nomad",
    "Web Developer",
    "Chromium Developer",
    "AI",
    "LLM",
    "React",
    "Next.js",
    "Influencer",
    "Game Developer",
  ],
  authors: [{ name: "JensenZhong" }],
  creator: "JensenZhong",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jensonzhong.com",
    title: "JensenZhong - Digital Nomad & Developer",
    description:
      "Personal website of JensenZhong - Influencer (>581K followers), Chromium Developer, Web Developer, and Digital Nomad.",
    siteName: "JensenZhong",
    images: [
      {
        url: "/images/social_photo.jpg",
        width: 1200,
        height: 630,
        alt: "JensenZhong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JensenZhong - Digital Nomad & Developer",
    description:
      "Personal website of JensenZhong - Influencer (>581K followers), Chromium Developer, Web Developer, and Digital Nomad.",
    images: ["/images/social_photo.jpg"],
    creator: "@jensonzhong",
  },
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${maShanZheng.variable} antialiased bg-background text-foreground`}
      >
        <ErrorBoundary>
          <Navbar />
          <div className="pt-[72px]">
            {children}
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
