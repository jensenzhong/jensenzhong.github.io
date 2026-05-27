import type { Metadata } from "next";
import { Geist, Geist_Mono, Ma_Shan_Zheng } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { ErrorBoundary } from "@/components/error-boundary";
import { LanguageProvider } from "@/components/language-provider";
import { siteConfig } from "@/config/site";
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
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
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/social_photo.jpg"],
    creator: siteConfig.twitterCreator,
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
          <LanguageProvider>
            <Navbar />
            <div className="pt-[72px]">
              {children}
            </div>
          </LanguageProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
